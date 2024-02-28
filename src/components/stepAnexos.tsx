import React, { ChangeEvent } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Button } from "@mui/material";

interface StepProps{
    files: File[];
    changed: any;
}

export default function StepAnexos(props: StepProps){
    
    const remove =(name: string)=>{
        const files = props.files.filter(file => file.name !== name);
        props.changed(files);
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            let totalSize = 0;
            const files: File[] = Array.from(event.target.files);
            if(files.length > 2) return alert("Só pode ser selecionado no maximo 2 arquivos!");
            for (const file of files) {
                totalSize += file.size;
              }
              const maxSize = 2 * 1024 * 1024; // 2 MB
              if (totalSize > maxSize) {
                alert("Os arquivos não podem passar de 2MB");
                props.changed([]);
                return
              }
            props.changed(files);
        }
      };
    return(
        <Box sx={{padding: 2, maxWidth: 400}}>
            <Typography
            variant="subtitle2"> Atenção! O limite máximo é de 2 arquivos para ser enviado e deverão ser selecionados juntos! Os arquivos juntos não poderão passar de 2MB!!</Typography>
            <Box sx={{display: "flex", flexDirection: "column", mt: 1, gap: 1}}>
            <label style={{color: "#3f60c7"}}>Selecione os arquivos</label>
            <input type="file" accept=".pdf, image/*" onChange={handleFileChange} multiple />
            </Box>
  
            <List sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                maxHeight: 200,
                overflow: "auto"}}>
                {props.files?.map((file, i)=>(
                <ListItem key={'f'+i}sx={{backgroundColor: "#f0f0f0", borderRadius: 6}}>
                    <ListItemText
                        sx={{wordWrap: "break-word", fontSize: 10}}
                        primary={file.name}
                        secondary={file.size + ' kb'}
                    />
                    <Button onClick={()=>{remove(file.name)}} color="error">X</Button>
                </ListItem>
                ))}
            </List>
        </Box>
    );
}