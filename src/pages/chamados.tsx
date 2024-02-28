import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import ResponsiveAppBar from "@/components/appBar";
import HorizontalLinearStepper from "@/components/stepper";
import StepDadosPessoais from "@/components/stepDP";
import StepMotivo from "@/components/stepMotivo";
import BoxSuporte from "@/components/boxSuporte";
import StepAnexos from "@/components/stepAnexos";

export default function PageChamados() {
  const [name, setName] = React.useState("");
  const [celular, setCelular] =  React.useState("");
  const [municipio, setMunicipio] =  React.useState("");
  const [setor, setSetor] =  React.useState("");
  const [setores, setSetores] =  React.useState<string[]>();
  const [selectMotivo, setSelectMotivo] = React.useState("");
  const [motivoAdd, setMotivoAdd] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [finished, setFinished] = React.useState(0);
  const options = ['Suporte Computador', 'Suporte Impressora', 'Suporte Sistemas', 'Suporte Tablet', 'Suporte Celular', 'Criação de Login', 'Requisição de Material', 'Convocação para o site']
  
  const request =async()=>{

    const newDesc = `
    Solicitante: ${name}
    Unidade: ${municipio}
    ${setor?`Setor: ${setor}`:''}
    Solicita: ${selectMotivo} ${motivoAdd?`- ${motivoAdd}`:''}
    ${desc?`Motivo: ${desc}`:''}
    Contato: ${celular}.
    `
    const form = new FormData();
    form.append('unity', municipio + setor);
    form.append('reason', selectMotivo);
    form.append('desc', newDesc);

    selectedFiles.forEach((file) => {
      form.append('files', file); // Adiciona cada arquivo sem um índice
    });

    const response = await fetch('http://localhost:8000/glpi', {
      method: 'POST',
      body: form
    });

    if(response.status == 200){
      setFinished(1);
    }else{
      setFinished(2);
    }
    
    if(selectMotivo == options[5]){
      const parts = motivoAdd.split('-')
      const datas = parts[1].split(',')
      const n = datas[0].replace(' ', '')
      const c = datas[1].replace(' ', '')
      const p = datas[2].replace(' ', '')
      const result = await fetch('http://localhost:8000/sso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },      
        body:  JSON.stringify({"name": n, "cpf": c, "cargo": p, "contact": celular})
      });

      if(result.status == 200){
        const uuid = await result.json()
        console.log(uuid)
      }
    }

    setName("");
    setCelular("");
    setMunicipio("");
    setSetor("");
    setSelectMotivo("");
    setDesc("");
    setMotivoAdd("");
    setSelectedFiles([]);

  }

  const endCall =()=>{
    try{
      if(!name) throw Error("Por favor preencha o nome corretamente!");
      if(!celular) throw Error("Por favor preencha o celular corretamente!");
      if(!municipio) throw Error("Por favor preencha o municipio corretamente!");
      if(setores && !setor) throw Error("Por favor selecione um setor!")
      if(!selectMotivo) throw Error("Por favor preencha o motivo!");
      if(selectMotivo != options[5] && !desc) throw Error("Por favor preencha uma descrição do problema!");
      request();
      return true
    }catch(e){
      alert(e);
      return false
    }
  }

  const steps = [
    <StepDadosPessoais
      key={'step1'}
      name={name}
      setName={setName}
      celular={celular}
      setCelular={setCelular}
      municipio={municipio}
      setMunicipio={setMunicipio}
      setor={setor}
      setSetor={setSetor}
      setores={setores}
      setSetores={setSetores}
    />,
    <StepMotivo
      key={'step2'}
      options={options}
      select={selectMotivo}
      setSelect={setSelectMotivo}
      desc={desc}
      setMotivoAdd={setMotivoAdd}
      setDesc={setDesc}/>,
    <StepAnexos 
      key={'step3'}
      files={selectedFiles}
      changed={setSelectedFiles}/>
  ];

  return (
    <Box>
      <ResponsiveAppBar  />
      <BoxSuporte>
        <Box className="boxStepper">
          <HorizontalLinearStepper
            steps={["DADOS PESSOAIS", "MOTIVO", "ANEXOS"]}
            components={steps}
            stepOptional={2}
            end={endCall}
            finished={finished}
            setFinished={setFinished}
            boxFinished={
              <Box>
                {finished == 0?(
                   <Box sx={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      O chamado está sendo aberto, aguarde a finalização por favor!
                    </Typography>
                    <CircularProgress/>
                   </Box>               
                ): undefined}
                {finished == 1?(
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    A solicitação foi aberta! Aguarde o contato.
                  </Typography>
                ):undefined}
                {finished == 2?(
                  <Typography sx={{ mt: 2, mb: 1, color: "red" }}>
                    Infelizmente aconteceu algum erro ao abrir a solicitação, por gentileza, nos avise no whatsapp através do numero (21)991920338
                  </Typography>
                ): undefined}
              </Box>
            }
          />
        </Box>
      </BoxSuporte>
    </Box>
  );
}