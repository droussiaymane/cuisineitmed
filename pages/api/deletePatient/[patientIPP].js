export default async function deletePatient(req, res) {

    const { patientIPP } = req.query;

    

     if (req.method === 'GET') {
		 console.log(process.env.back_url+"v1/users/" + patientIPP);
        var result = await fetch(process.env.dpi_uri+"api/patient/delete/"+patientIPP+"?_method=DELETE",{method:"POST"});
        
        const status = result.status;
        console.log(status);
        if (status == 201)
        {
            res.status(201).json({"msg": "Patient Deleted"});
        }
        
    } else {
      res.status(430).json({ message: "You cannot access this route" })
    }
}