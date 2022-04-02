export default async function activateUser(req, res) {

    const { userId } = req.query;

    

     if (req.method === 'GET') {
		 console.log(process.env.back_url+"v1/users/" + userId);
        var result = await fetch(process.env.back_url+"v1/users/" + userId, {
            method: 'GET',
          });
        // result = await result.json();
        const status = result.status;
        console.log(status);
        if (status == 200)
        {
            res.status(200).json({"msg": "User Deleted"});
        }
        
    } else {
      res.status(430).json({ message: "You cannot access this route" })
    }
}