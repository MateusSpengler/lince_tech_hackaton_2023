import * as React from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState } from "react";
import Swal from 'sweetalert2'

const steps = ['Escolha um motivo', 'Informações', 'Descrição'];

const stepFlow = [{ code: 1, label: 'ERRO DE SOFTWARE' }, { code: 2, label: 'MELHORIAS' }, { code: 3, label: 'DÚVIDAS' }, { code: 4, label: 'REUNUÕES E TREINAMENTOS' }, { code: 5, label: 'PROBLEMAS EQUIPAMENTOS' }, { code: 6, label: 'PROBLEMAS DE REDE' }, { code: 7, label: 'ESPECIFICAÇÕES DE EQUIPAMENTOS' }, { code: 8, label: 'LICENÇAS' }, { code: 9, label: 'MUDANÇA DE LAYOUT' }, { code: 10, label: 'LEVANTAMENTOS/MELHORIAS' }]

const apps = [{ code: 1, label: 'SINGE' }, { code: 2, label: 'SALLE' }, { code: 3, label: 'CONNECT' }, { code: 4, label: 'DECOLA' }, { code: 4, label: 'MIAMI' }, { code: 5, label: 'OUTROS' }]

export default function ModalPriceDetail({ isOpen }) {

    const [open, setOpen] = useState(isOpen);
    const [scroll] = useState('body');

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const [flowCode, setFlowCode] = useState(0);
    const [software, setSoftware] = useState(0);

    const handleClose = () => {
        setOpen(false);
    };

    const handleNext = () => {

        var error = 0;
        var menssage = '';

        if (activeStep === 0) {
            if (flowCode === null) {
                error = 1;
                menssage = 'Selecione um motivo de abertura de chamado';
            }
        }

        if (error === 0) {
            let newSkipped = skipped;
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: menssage,
            })
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChangeFlowCode = (event, newFlowCode) => {
        setFlowCode(newFlowCode);
    };

    const handleChangeSoftware = (event) => {
        setSoftware(event.target.value);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                maxWidth='lg'
                fullWidth
            >
                <DialogTitle>
                    <Box>
                        <Stepper sx={{ marginTop: '1rem' }} activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>

                    </Box>
                    <Box sx={{ marginTop: '1.5rem', borderBottom: 1, borderColor: 'divider' }}>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ height: '62vh' }}>
                    {activeStep === steps.length ? (
                        <Box>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                        </Box>
                    ) : (
                        <Box>
                            {activeStep === 0 && (
                                <Box sx={{ marginTop: '2rem' }}>
                                    <ToggleButtonGroup
                                        sx={{ display: "grid", gap: '25px', gridTemplateColumns: '1fr 1fr' }}
                                        orientation="vertical"
                                        color="primary"
                                        value={flowCode}
                                        exclusive
                                        onChange={handleChangeFlowCode}
                                    >
                                        {stepFlow.map((flow, index) => (

                                            <ToggleButton sx={{ padding: '15px', fontSize: '12pt' }} key={index} value={flow.code}>{flow.label}</ToggleButton>

                                            // <Paper
                                            //     sx={{ padding: '30px', fontSize: '12pt' }}
                                            //     id={index} elevation={1} value={flow.code}
                                            // >
                                            //     {flow.label}
                                            // </Paper>
                                        ))}
                                    </ToggleButtonGroup>

                                </Box>
                            )}

                            {activeStep === 1 && (
                                <Box
                                    sx={{ display: "grid", gap: '25px', gridTemplateColumns: '1fr 1fr' }}
                                >
                                    {flowCode === 5 || flowCode === 6 ? (
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="select-software">Software</InputLabel>
                                            <Select id="select-software" value={software} label="Software" onChange={handleChangeSoftware}>
                                                {apps.map((app, index) => (
                                                    <MenuItem key={index} value={app.code}>{app.label}</MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    ) : flowCode === 7 || flowCode === 8 || flowCode === 9 || flowCode === 10 ? (
                                        <Box>teste 2</Box>
                                    ) : (<Box>teste 3</Box>)}
                                </Box>
                            )}

                            {activeStep === 2 && (
                                <Box>tes 3</Box>
                            )}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', pt: 2 }}>
                        {activeStep === 0 ? (
                            <Button
                                color="inherit"
                                onClick={handleClose}
                            >
                                Fechar
                            </Button>) :
                            (
                                <Button
                                    color="inherit"
                                    onClick={handleBack}
                                >
                                    Voltar
                                </Button>
                            )}

                        <Box sx={{ flex: '1 1 auto' }} />

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Enviar' : 'Próximo'}
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    )

}