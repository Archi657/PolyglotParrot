import spacy
from difflib import SequenceMatcher

# Load a multilingual model
nlp = spacy.load("xx_ent_wiki_sm")

def compare_texts(reference, user_input):
    """
    Compare user input to reference text.
    Returns detailed word-by-word results with status: correct, incorrect, missing, extra.
    Accuracy now counts all reference words including missing ones.
    """
    def tokenize(text):
        """Tokenize text while keeping apostrophes attached in French/Spanish."""
        doc = nlp(text)
        tokens = []
        for token in doc:
            # Attach apostrophes to previous word
            if token.text.startswith("'") and tokens:
                tokens[-1] += token.text
            else:
                tokens.append(token.text)
        return tokens

    ref_tokens = tokenize(reference)
    user_tokens = tokenize(user_input)
    matcher = SequenceMatcher(None, ref_tokens, user_tokens)
    result = []
    correct_count = 0
    total_words = len(ref_tokens)

    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == "equal":
            for idx in range(i1, i2):
                result.append({
                    "text": ref_tokens[idx],
                    "status": "correct"
                })
            correct_count += (i2 - i1)

        elif tag == "replace":
            # Words user wrote that are wrong
            for r_idx, u_idx in zip(range(i1, i2), range(j1, j2)):
                result.append({
                    "text": user_tokens[u_idx],
                    "status": "incorrect"
                })
            # Missing words from user
            if (i2 - i1) > (j2 - j1):
                for r_idx in range(j2 - j1 + i1, i2):
                    result.append({
                        "text": ref_tokens[r_idx],
                        "status": "missing"
                    })
            # Extra words typed by user
            if (j2 - j1) > (i2 - i1):
                for u_idx in range(i2 - i1 + j1, j2):
                    result.append({
                        "text": user_tokens[u_idx],
                        "status": "extra"
                    })

        elif tag == "delete":
            for r_idx in range(i1, i2):
                result.append({
                    "text": ref_tokens[r_idx],
                    "status": "missing"
                })

        elif tag == "insert":
            for u_idx in range(j1, j2):
                result.append({
                    "text": user_tokens[u_idx],
                    "status": "extra"
                })

    # Accuracy = correct words / total reference words (missing counts as wrong)
    accuracy = (correct_count / total_words) * 100 if total_words > 0 else 0

    return {
        "result": result,
        "accuracy": round(accuracy, 1)
    }


# Example usage
if __name__ == "__main__":
    reference_text = (
        "Les animaux sont intéressants. J'aime beaucoup les chats et les chiens. "
        "Les chats sont très indépendants, mais les chiens sont toujours heureux et jouent avec les gens. "
        "Chez moi, j'ai un chat qui s'appelle Bella. Elle aime dormir et jouer avec ses jouets. "
        "Les animaux rendent la vie plus joyeuse."
    )
    user_input_text = "Les animaux sont intressants. J'ème beaucoup les chats et les chiens. Les chats sont très depnedant, mais chiens toujours heureux"

    import json
    print(json.dumps(compare_texts(reference_text, user_input_text), ensure_ascii=False, indent=2))
