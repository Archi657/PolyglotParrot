import spacy
from difflib import SequenceMatcher
from Levenshtein import distance as levenshtein_distance  # Install via: pip install python-Levenshtein

nlp = spacy.load("en_core_web_sm")

def word_similarity(word1, word2):
    """Calculate similarity score based on Levenshtein distance."""
    max_len = max(len(word1), len(word2))
    if max_len == 0:
        return 0  # Avoid division by zero

    edit_dist = levenshtein_distance(word1, word2)
    similarity = 1 - (edit_dist / max_len)  # Normalize between 0 and 1

    return similarity  # 1 = exact match, 0 = completely different

def compare_texts(reference, user_input):
    ref_doc = nlp(reference)
    user_doc = nlp(user_input)

    ref_tokens = [token.text for token in ref_doc]
    user_tokens = [token.text for token in user_doc]

    matcher = SequenceMatcher(None, ref_tokens, user_tokens)
    result = []

    correct_count = 0
    total_words = len(ref_tokens)

    # Track matched words to detect missing ones later
    matched_indices = set()

    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == 'equal':
            result.append({"text": " ".join(user_tokens[j1:j2]), "status": "correct"})
            correct_count += (j2 - j1)
            matched_indices.update(range(i1, i2))  # Mark these indices as matched
        elif tag == 'replace':
            for r_idx, u_idx in zip(range(i1, i2), range(j1, j2)):
                r_word = ref_tokens[r_idx]
                u_word = user_tokens[u_idx]
                similarity = word_similarity(r_word, u_word)

                if similarity >= 0.8:  # If 80% similar, consider it "partially correct"
                    result.append({"text": u_word, "status": "partially correct", "correct_text": r_word, "similarity": round(similarity, 2)})
                    correct_count += 0.5  # Partial credit
                else:
                    result.append({"text": u_word, "status": "incorrect", "correct_text": r_word, "similarity": round(similarity, 2)})

                matched_indices.add(r_idx)  # Mark this as checked
        
        elif tag == 'delete':
            for r_idx in range(i1, i2):
                if r_idx not in matched_indices:  # Only add if it wasn't matched elsewhere
                    result.append({"text": ref_tokens[r_idx], "status": "missing"})
        
        elif tag == 'insert':
            result.append({"text": " ".join(user_tokens[j1:j2]), "status": "extra"})

    # Compute accuracy with partial credit
    accuracy = (correct_count / total_words) * 100 if total_words > 0 else 0

    return {"result": result, "accuracy": round(accuracy, 1)}

# Example usage
reference_text = "All happy families are alike, but every unhappy family is unhappy in its own way. Everything was in confusion in the Oblonskys' house."
user_input_text = "All happy families are happy in its own way right?"

result = compare_texts(reference_text, user_input_text)

print("[INFO] Testing the correction text function")
print(result)
