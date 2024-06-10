import React , {useEffect, useState} from 'react'
import { Card } from "antd"
import Controls from "../../../commonComponent/Controls"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Form } from "../../../commonComponent/Form"
import { appUrl } from "../../../appurl"
import axios from "axios"
import { Grid, Button } from "@mui/material"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import Notification from "../../../commonComponent/notification"


interface ItemState{
  firstName:string;
  middleName:string;
  lastName:string;
  phone:string;
  email:string;
  username:string;
  address:string;
}


const initialState : ItemState = {
  firstName:"",
  middleName:"",
  lastName:"",
  phone:"",
  email:"",
  username:"",
  address:"",

}


const EditAdmin = ({...props}) => {
  const [viewMode, setViewMode] =useState(props.viewMode);
  const [selectedAdmin, setSelectedAdmin]= useState(
    props.selectedAdmin
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notify,setNotify] = useState({
    isOpen:false,
    message:"",
    type:"",
  });

  useEffect(()=>{
   setViewMode(props.selectedAdmin);
    setSelectedAdmin(props.selectedAdmin);
    if(props.viewMode === "new"){
      formik.resetForm({
        values: initialState,
      });
    }
  }, [props.viewMode, props.selectedAdmin]);

  const onUpdateSuccess = () => {
    setNotify({
      isOpen:true,
      type:"success",
      message:"Admin is Successfully Modified !",      
    });
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.reload();
    }, 2000);
  };


  const onUpdateError=(response:any)=> {
    setNotify({
      isOpen:true,
      type:"error",
      message:response.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
  },2000);
  };


  const validationSchema =Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().required("Middle Name is required"),
    address: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: selectedAdmin,
    onSubmit: (values) =>{
      setIsSubmitting(true);
      axios
          .put(appUrl + `admin/${selectedAdmin.id}`, values)
          .then(() => onUpdateSuccess())
          .catch((error) => onUpdateError(error.responce.data.message));
    },
    validationSchema:validationSchema,
  });
  return (
    <div className="create-card">
      <Card title={
        <h3 
        style={{ marginRight:"87%", marginTop:"2%", marginBottom:"1%" }}
        >
          extra={
            <a onClick={() => props.closedeedit()}>
              <CancelOutlinedIcon fontSize="medium" className="close-btn" />             
            </a>
          }

        </h3>
      }
     >

      <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
            <Controls.Input
            className="inputField"
            required
            id="firstName"
            label="FirstName"
            {...formik.getFieldProps("firstName")}
            error={
              formik.touched.firstName && formik.errors.firstName
              ?formik.errors.firstName
              : ""
            }
            />
            </Grid>
            <Grid item xs={4}>
              <Controls.Input
              className="inputField"
              required
              id="middleName"
              label="Middle Name"
              {...formik.getFieldProps("middleName")}
              error ={
                formik.touched.middleName && formik.errors.middleName
                  ? formik.errors.middleName
                  : ""
              }
              />
            </Grid>
            <Grid item xs={4}>
              <Controls.Input
              className="inputField"
              id="email"
              label="Email"
             type="email"
             {...formik.getFieldProps("email")}
             error={
              formik.touched.email && formik.errors.email 
                ?formik.errors.email:""
             }
             />

            </Grid>

            <Grid item xs={4}>
               <Controls.Input
                 className="inputField"
                 required
                 id="phone"
                 label="Phone"
                 {...formik.getFieldProps("phone")}
                 error = {
                  formik.touched.phone && formik.errors.phone
                  ? formik.errors.phone : ""
                 }
                 />                
            </Grid>
            <Grid item xs={4}>
              <Controls.Input
              className="inputField"
              id="address"
              label="Address"
              required
              {...formik.getFieldProps("address")}
              error={
                formik.touched.address && formik.errors.address
                  ?formik.errors.address :""                 
              }
              />
            </Grid>           
          </Grid>


          <div className="btn-form">
            {viewMode == "new" && (
              <>
              {isSubmitting ? (
                <Button 
                  className="clocked-btn"
                  variant="contained"
                  disabled={isSubmitting}
                  >
                    Sending...
                  </Button>
              ) :(
                <Button 
                   className="send-btn"
                  variant="contained"
                  type="submit">
                    Send
                  </Button>
              )}
              </>
            )}

            {viewMode == "edit" && (
              <>
              {isSubmitting ? (
                <Button 
                className="clicked-btn"
                variant="contained"
                disabled={isSubmitting}               
                >
                  Updating...
                </Button>
              ) :(
                <Button
                   className="send-btn"
                   variant="contained"
                   type="submit"
                   >
                    Update
                   </Button>
              )}
              </>
            )}
          </div>  
     </Form>
     </Card>
     <Notification notify = {notify} setNotify={setNotify} />
    </div>
  );
};

export default EditAdmin