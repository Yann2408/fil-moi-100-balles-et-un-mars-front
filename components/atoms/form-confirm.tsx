import { AlertColor, Box, Button, Modal, Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react'

import LoadingButton from '@mui/lab/LoadingButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  width: '90%'
};

interface IOFormCommonConfirmProps {
  title: string
  text?: string
  ctaColor: AlertColor
  action: () => void
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
  loading: boolean

}

const FormConfirm = (props: IOFormCommonConfirmProps): JSX.Element => {

  const { title, text, ctaColor, action, setOpen, open, loading } = props

  const handleClose = (_event: object, reason: string) => {
    if (reason && reason == "backdropClick") {
      return
    }
    setOpen(false)
  }

  return (

    <Modal open={open} onClose={handleClose}>

      <Box sx={{ ...style, mt: 1 }}>
        <Typography variant='h5'>
          {title}
        </Typography>
        <Typography marginTop={2} >
          {text}
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="flex-end" spacing={2} marginTop={5}>
          <Button variant="outlined" color={ctaColor} size="medium" onClick={() => setOpen(false)}>
            Non
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            color={ctaColor}
            loading={loading}
            onClick={() => action()}
          >
            Oui
          </LoadingButton>
        </Stack>
      </Box>

    </Modal>


  );

}

export default FormConfirm
