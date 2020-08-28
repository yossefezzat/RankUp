import spacy
import os
import re
from nltk.corpus import stopwords

spacy_nlp = spacy.load('en_core_web_sm')

def get_name(text):
    doc = spacy_nlp(text)
    for entity in doc.ents:
        if entity.label_ in ["PERSON"]:
            return entity
    return None
    

#needs str casting
def get_email(text):
    email = None
    match = re.search(r'[\w\.-]+@[\w\.-]+', text)
    if match is not None:
        email = match.group(0)
    return email

def remove_stopwords(new_tokens):
        new_tokens_without_stopwords = [token for token in new_tokens if token not in stopwords.words('english')]
        return new_tokens_without_stopwords
