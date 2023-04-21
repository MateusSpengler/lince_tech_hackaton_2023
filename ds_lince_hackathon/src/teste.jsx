import React from 'react';
import { Box, Fab } from '@mui/material/';
import ModalCall from './modalChamado'
import { createRoot } from "react-dom/client";

function Teste() {

    const handleOpenModalCall = (evt) => {
        evt.preventDefault();
        const container = document.getElementById("modal-price");
        const root = createRoot(container);
        return root.render(
            <ModalCall
                isOpen={true}
            />
        );
    };

    return (
        <Box>
            <input type="hidden" id="modal-price" />
            <Fab sx={{
                position: 'absolute',
                bottom: 18,
                right: 18,
                fontWeight: 'bold'
            }}
                variant="extended"
                size="large"
                color="primary"
                onClick={(evt) => handleOpenModalCall(evt)}
            >
                Criar Chamado
            </Fab>
        </Box>
    )
}

export default Teste;