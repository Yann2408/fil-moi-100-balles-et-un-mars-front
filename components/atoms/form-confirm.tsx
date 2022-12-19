import { AlertColor, Box, Button, Modal, Stack } from '@mui/material';
import { Dispatch, SetStateAction } from 'react'

import LoadingButton from '@mui/lab/LoadingButton';

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

      <Box sx={{ mt: 1 }}>

        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="flex-end" spacing={2} marginTop={5}>
          <Button variant="outlined" color={ctaColor} size="medium" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            color={ctaColor}
            loading={loading}
            onClick={() => action()}
          >
            Confimer
          </LoadingButton>
        </Stack>
      </Box>

    </Modal>


  );

}

export default FormConfirm
