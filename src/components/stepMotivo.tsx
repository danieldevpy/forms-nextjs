
import React from "react";
import { Box, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,  } from "@mui/material";
import BasicSelect from "@/components/select";


interface MotivoProps{
    select: string;
    setSelect: any;
    desc: string;
    setDesc: any;
    setMotivoAdd: any;
    options: string[];
}

export default function StepMotivo(props: MotivoProps){
    const [textMotivo, setTextMotivo] = React.useState("");
    const [rbCreate, setRbCreate] = React.useState('Sistema SSO');
    const [name, setName] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const [cargo, setCargo] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [municipio, setMunicipio] = React.useState("");
    const optionsCargo = ["Medico", "Enfermeiro"]

    React.useEffect(()=>{
        if(props.select){
            if(props.select == props.options[2] || props.select == props.options[5]){
                props.setMotivoAdd(textMotivo);
            }else{
                props.setMotivoAdd("");
            }
        }
    }, [props.select])

    React.useEffect(()=>{
     
        if(props.select == props.options[2]){
            setTextMotivo(rbCreate);
            props.setMotivoAdd(rbCreate);
        }
        if(props.select == props.options[5]){
            console.log('k')
            if(rbCreate == "Sistema SSO"){
                let saveText = `* ${rbCreate} - ${name}, ${cpf}, ${cargo} *`;
                props.setMotivoAdd(saveText);
                setTextMotivo(saveText);
            }
            if(rbCreate == "Sistema MARQUE Fácil"){
                let saveText = `${rbCreate} - ${name}, ${cpf}, ${cargo}, ${email}, ${municipio}`;
                props.setMotivoAdd(saveText);
                setTextMotivo(saveText);
            }
        }
       
    }, [name, cpf, cargo, email, municipio, rbCreate])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRbCreate((event.target as HTMLInputElement).value);
      };
    
    const changed =(value: string)=>{
        props.setSelect(value);
    }
    
    const checkCPF =(value: string)=>{
        if(/^\d+$/.test(value)){
            setCpf(value)
        }
    }
    

    return(
        <Box className="stepperMotivo">
            <BasicSelect
            label='Motivo'
            value={props.select}
            changed={changed}
            options={props.options}
            />
            <Box>
            {props.select == props.options[2]?(
                <FormControl>
                <FormLabel>Sistema</FormLabel>
                <RadioGroup
                value={rbCreate}
                onChange={handleChange}>
                  <FormControlLabel value="Suporte SSO" control={<Radio />} label="Suporte SSO" />
                  <FormControlLabel value="Suporte MARQUE Fácil" control={<Radio />} label="Suporte MARQUE Fácil" />
                  <FormControlLabel value="Plataforma de Ensino NEP-CISBAF" control={<Radio />} label="Plataforma de Ensino NEP-CISBAF" />
                </RadioGroup>
              </FormControl>      
            ):(null)}
            {props.select == props.options[5]?(
                  <FormControl>
                  <FormLabel>Sistema</FormLabel>
                  <RadioGroup
                    value={rbCreate}
                    onChange={handleChange}>
                    <FormControlLabel value="Sistema SSO" control={<Radio />} label="Sistema SSO" />
                    {rbCreate == "Sistema SSO"? (
                        <Box className="inputsStepper">
                            <TextField variant="outlined" label="NOME COMPLETO" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                            <TextField variant="outlined" label="CPF" value={cpf} onChange={(e)=>{checkCPF(e.target.value)}}/>
                            {/* <TextField variant="outlined" label="CARGO" value={cargo} onChange={(e)=>{setCargo(e.target.value)}}/> */}
                            <BasicSelect options={optionsCargo} value={cargo} changed={setCargo} label="CARGO"></BasicSelect>
                        </Box>
                    ):(null)}
                    <FormControlLabel value="Sistema MARQUE Fácil" control={<Radio />} label="Sistema MARQUE Fácil" />
                    {rbCreate == "Sistema MARQUE Fácil"? (
                        <Box sx={{display: 'flex', flexDirection: "column", gap: 1}}>
                           <Box className="inputsStepper">
                            <TextField variant="outlined" label="NOME COMPLETO" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                            <TextField variant="outlined" label="CPF" value={cpf} onChange={(e)=>{setCpf(e.target.value)}}/>
                            <TextField variant="outlined" label="CARGO" value={cargo} onChange={(e)=>{setCargo(e.target.value)}}/>
                        </Box>
                        <Box className="inputsStepper">
                            <TextField variant="outlined" label="EMAIL" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                            <TextField variant="outlined" label="MUNICIPIO" value={municipio} onChange={(e)=>{setMunicipio(e.target.value)}}/>
                        </Box>
                        </Box>
                    ):(null)}
                  </RadioGroup>
                </FormControl>    
            ):(null)}
            {props.select != props.options[5] && props.select?(
                <TextField
                    variant="outlined"
                    label="Descrição do problema"
                    multiline={true}
                    fullWidth rows={5}
                    value={props.desc}
                    onChange={(e)=>{props.setDesc(e.target.value)}}/> 
            ): (null)}
        </Box>
    </Box>
    )
}