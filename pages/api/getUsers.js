import withAuth from "../Auth/withAuth";
export default async function getUsers(req, res) {
    if (req.method === 'GET') {
        var result = await fetch(process.env.back_url+"v1/users", {
            method: 'GET',
          });
        result = await result.json();
        console.log(result['data'])
        res.json(result['data']);
    } else {
      res.status(430).json({ message: "You cannot access this route" })
    }
  }