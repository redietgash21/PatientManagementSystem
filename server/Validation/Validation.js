









const yup=require('yup');
const userSchema =yup.object({
    lastName: yup.string().required(),
    firstName: yup.string().required(),
  
});


module.exports=userSchema;