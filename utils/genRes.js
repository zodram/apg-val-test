


const rag = (process.env.NEXT_PUBLIC_RAG === 'true');


async function getContext(prompt) {

    let ctx = '';
    if (rag) {
  
      const vectaraQry = {
        query: [
          {
            query: prompt
                .replace('[INST]', '')
                .replace('[/INST]', '')
                .trim(),
            numResults: 3,
            contextConfig: {
              charsBefore: 20,
              charsAfter: 20,
              sentencesBefore: 2,
              sentencesAfter: 2,
            },
            corpusKey: [
              {
                customerId: process.env.VECTARA_CUSTOMER_ID,
                corpusId: process.env.VECTARA_CORPUS_ID,
              }
            ],
          }
        ]
      };
  
      const embeddingsReq = await fetch(process.env.VECTARA_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'customer-id': process.env.VECTARA_CUSTOMER_ID,
          'x-api-key': process.env.VECTARA_API_KEY,
        },
        body: JSON.stringify(vectaraQry),
      });
      const embeddingsRes = await embeddingsReq.json();
  
      ctx = "START CONTEXT BLOCK\n";
      embeddingsRes.responseSet[0].response.forEach((response) => {
        ctx += ' ' + decode(response.text) + ' ';
      });
      ctx +=
          "\nEND OF CONTEXT BLOCK\n" +
          "You will take into account any CONTEXT BLOCK that is provided in a conversation.\n"
      ;
  
    }
  
    return ctx;
  
  }