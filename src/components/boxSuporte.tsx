import React from "react"
import { Box, Button, Typography } from "@mui/material"
import imgContact from '../../public/contact.jpg'
import Image from "next/image"


interface SuporteProps{
    children: any;
}

export default function BoxSuporte(props: SuporteProps){
    const [windowSize, setWindowSize] = React.useState(0);
    const [started, setStarted] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
          setWindowSize(window.innerWidth);
        };
        setWindowSize(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);


    return(
        <Box className="boxSuporte">
            <Box className="boxSuporteLimited">
                <Box>
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{color: "#445fc4"}}>Suporte TI</Typography>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#3f60c7",
                                fontWeight: "bold",
                                }}>Online</Typography>
                    </Box>
                    {started && windowSize < 800? (undefined):(
                        <Typography
                        variant="subtitle1"> Bem-vindo à nossa página de solicitação de suporte!
                        Por favor, preencha os campos abaixo com o máximo de detalhes possível sobre sua solicitação. Isso nos ajudará a entender melhor sua situação e a fornecer uma solução rápida e eficaz.
                        Agradecemos sua colaboração!</Typography>
                    )}
        
                    {started? (
                        <Image
                        className="imgBoxSuporte"
                        style={{marginTop:-60, zIndex: -1}}
                        src={imgContact}
                        width={300}
                        height={300}
                        alt="img"/>
                    ):(
                        <Button variant="contained" onClick={()=>{setStarted(true)}}>Começar</Button>
                    )}
                </Box>
            </Box>
            <Box>
                {started? (
                    props.children
                ):(
                    <Image
                        className="imgBoxSuporte"
                        src={imgContact}
                        width={500}
                        height={500}
                        alt="img"/>
                )}
            </Box>
        </Box>
    )
}