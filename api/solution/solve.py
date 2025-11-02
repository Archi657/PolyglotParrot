import spacy
from difflib import SequenceMatcher
import re

nlp = spacy.load("en_core_web_sm")

# Split text into words and punctuation
WORD_SPLIT_REGEX = re.compile(r'(\W)', re.UNICODE)

def split_words_punct(text):
    """Split text into words and punctuation."""
    parts = WORD_SPLIT_REGEX.split(text)
    return [p for p in parts if p.strip() != '']

def compare_texts(reference, user_input):
    ref_tokens = split_words_punct(reference)
    user_tokens = split_words_punct(user_input)

    matcher = SequenceMatcher(None, ref_tokens, user_tokens)
    result = []

    matched_indices = set()

    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == 'equal':
            for u_idx in range(j1, j2):
                result.append({"text": user_tokens[u_idx], "status": "correct"})
            matched_indices.update(range(i1, i2))

        elif tag == 'replace':
            for r_idx, u_idx in zip(range(i1, i2), range(j1, j2)):
                result.append({
                    "text": user_tokens[u_idx],
                    "status": "incorrect",
                    "expected": ref_tokens[r_idx]
                })
                matched_indices.add(r_idx)

            # Handle extra words if user typed more than reference
            if (i2 - i1) < (j2 - j1):
                for u_idx in range(j1 + (i2 - i1), j2):
                    result.append({
                        "text": user_tokens[u_idx],
                        "status": "extra"
                    })
            # Handle missing words if user typed fewer
            elif (i2 - i1) > (j2 - j1):
                for r_idx in range(i1 + (j2 - j1), i2):
                    result.append({
                        "text": ref_tokens[r_idx],
                        "status": "missing"
                    })

        elif tag == 'delete':
            for r_idx in range(i1, i2):
                if r_idx not in matched_indices:
                    result.append({
                        "text": ref_tokens[r_idx],
                        "status": "missing"
                    })

        elif tag == 'insert':
            for u_idx in range(j1, j2):
                result.append({
                    "text": user_tokens[u_idx],
                    "status": "extra"
                })

    # Calculate simple accuracy: correct words / total reference words
    correct_count = sum(1 for w in result if w["status"] == "correct")
    accuracy = (correct_count / len(ref_tokens) * 100) if ref_tokens else 0

    return {"result": result, "accuracy": round(accuracy, 1)}


# ----------------------------
# Example usage
# ----------------------------
if __name__ == "__main__":
    reference_text = "All happy families are alike, but every unhappy family is unhappy in its own way."
    user_input_text = "All happy families are happy in its own way right?"

    result = compare_texts(reference_text, user_input_text)

    import pprint
    pprint.pprint(result)
