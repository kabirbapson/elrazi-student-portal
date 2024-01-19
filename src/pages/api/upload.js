export default async function handler(req, res) {
    try {
      if (req.method === 'POST') {
        const formData = await req.formData();
        const file = formData.get('file');
  
        // Process the uploaded file on the server
        // (e.g., save to a file system, store in a database)
  
        res.status(200).json({ message: 'File uploaded successfully' });
      } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
      }
    } catch (error) {
      console.error(error);
      res.status(500).end('Internal Server Error');
    }
  }
  