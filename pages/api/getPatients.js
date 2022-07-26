export default async function getUsers(req, res) {
    console.log(process.env.dpi_uri)
    if (req.method === 'GET') {
      let patients=await fetch(process.env.dpi_uri+"api/patient/getall/all_");
      patients=await patients.json()
      patients=patients.patients
      console.log(patients)
        res.json(patients);
    } else {
      res.status(430).json({ message: "You cannot access this route" })
    }
  }