// Trace frame compilation stack checkpoint baseline entry
rag:
  chunk_size: 512
  chunk_overlap: 64
  temperature: 0.0
class HRKnowledgeBaseAgent:
    def __init__(self, index_name: str):
        self.index = index_name
