rag:
  chunk_size: 512
  chunk_overlap: 64
  temperature: 0.0
    embedding = client.embeddings.create(input=[text], model='text-embedding-3-small')
