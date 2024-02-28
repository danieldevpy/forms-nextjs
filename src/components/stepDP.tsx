import React from "react";
import { Box, TextField } from "@mui/material";
import BasicSelect from "@/components/select";
import { municipios } from "@/controller/municipios";


interface StepDadosPessoaisProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  celular: string;
  setCelular: React.Dispatch<React.SetStateAction<string>>;
  municipio: string;
  setMunicipio: React.Dispatch<React.SetStateAction<string>>;
  setor: string;
  setSetor: React.Dispatch<React.SetStateAction<string>>;
  setores: string[]|undefined;
  setSetores: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

export default function StepDadosPessoais(props: StepDadosPessoaisProps) {
  const chaves: string[] = Object.keys(municipios);

  const handleChange = (value: string) => {
    props.setMunicipio(value);
    if (municipios[value] && Array.isArray(municipios[value])) {
      const listaValores = municipios[value] as string[];
      props.setSetores(listaValores);
    } else {
      props.setSetores(undefined);
    }
  };

  return (
    <Box className="formsStepper">
      <Box className="inputsStepper">
        <TextField
          label="SEU NOME"
          variant="outlined"
          value={props.name}
          onChange={(e) => props.setName(e.target.value)}
        />
        <TextField
          label="CELULAR"
          variant="outlined"
          value={props.celular}
          onChange={(e) => props.setCelular(e.target.value)}
        />
      </Box>
      <Box className="selectStepper">
        <BasicSelect label="LOCAL" value={props.municipio} changed={handleChange} options={chaves} />
        {props.setores ? (
          <BasicSelect label="SETOR" value={props.setor} changed={props.setSetor} options={props.setores} />
        ) : null}
      </Box>
    </Box>
  );
}
