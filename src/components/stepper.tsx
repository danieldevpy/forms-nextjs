'use client'

import * as React from 'react';
import {Typography, Button, StepLabel, Step, Stepper, Box, TextField} from '@mui/material';

interface StepperProps{
  steps: string[];
  stepOptional?: number;
  components: React.ReactNode[];
  end: any;
  finished: number;
  setFinished: any;
  boxFinished: any;
}


export default function HorizontalLinearStepper(props: StepperProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === props.stepOptional;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      console.log(newSkipped)
      newSkipped.delete(activeStep);
    }
    if(activeStep == 2){

      if(!props.end()) return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    props.setFinished(0);
  };

  return (
    <Box className="stepper">
      <Stepper activeStep={activeStep}>
        {props.steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Opcional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === props.steps.length ? (
        <React.Fragment>
          {props.boxFinished}
          {props.finished?(
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Abrir um chamado novo</Button>
          </Box>
          ):(null)}
        </React.Fragment>
      ) : (
        <React.Fragment>
           {props.components[activeStep]}
       

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="info"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Voltar
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="warning" onClick={handleSkip} sx={{ mr: 1 }}>
                Pular
              </Button>
            )} */}
            <Button onClick={handleNext}>
              {activeStep === props.steps.length - 1 ? 'Finalizar' : 'Próximo'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}