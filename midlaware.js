

// function validateUserCreation(req,res,next){
//   const {id, name, branch}=req.body;
//   if(!id|| id.length<2){
//     return res.status(400).json({erroe:"username must be at least 2 character"});
//   };
//   if(!name|| name.length<5){
//     return res.status(400).json({error:"must be at least 5 character"});
//   };
//   if(!branch || branch.length<3){
//     return res.status(400).json({error:"branch name must be at least   3 character"})
//   }
// }

function validateUserCreation(req,res,next){
    const { id, name, branch}=req.body;
    if(!id||id.length<2){
        return res.status(400).json({error:"need 2 at least"});
    };
    if(!name||name.length<3){
        return res.status(400).json({error:"add at least 3 word"});
    };
    if(!branch||branch.length<3){
        return res.status(400).json({error:"branch name only bro"});
    };
     next();
}

export {validateUserCreation};