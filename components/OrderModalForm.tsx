import { useState } from 'react';
import { Stepper, Button, Group , Box,
         TextInput, Select } from '@mantine/core';
import { TimeInput, DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { Clock } from 'tabler-icons-react';
import LoginView from './auth/LoginView';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth } from '../lib/firebaseClient';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import next from 'next';
import { useRouter } from 'next/router'
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
import useOrderModal from './hooks/useOrderModal';

export default function OrderModalForm() {
  const now = new Date();
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const [orderType, setOrderType] = useState(0);
  const [timeValue, setTimeValue] = useState(new Date())
  const router = useRouter()

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
    signInSuccess: () => {
      nextStep;
    }
  }
  const { isActive, setOrderActive } = useOrderModal((state) => state);

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="First step" description="Account Log-in" allowStepSelect={active > 0}>
         <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Select Order type" allowStepSelect={active > 1}>
          <Button onClick={() => {setOrderType(2); setActive((current) => (current < 3 ? current + 1 : current))}}>
            Pick-up
            </Button>
          <Button onClick={() => {setOrderType(1); setActive((current) => (current < 3 ? current + 1 : current))}}>
            Delivery</Button>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Set order details" allowStepSelect={active > 2}>
          {(orderType != 0 && orderType == 1) ? 
            <>
            <Box>
              <form>
                <Select
                  label="Delivery Location"
                  placeholder="Choose address"
                  data={[{value:"Address #1", label:"Address #1"}]}
                />
                    <DatePicker
                      placeholder="Delivery date"
                      label="Delivery date"
                      minDate={dayjs(now).toDate()}
                      maxDate={dayjs(now).add(2, 'days').toDate()}
                    />
                <TimeInput
                  label="Delivery time"
                  placeholder="Delivery time"
                  icon={<Clock size={16} />}
                  defaultValue={timeValue}
                  format="12"
                  onChange={setTimeValue}
                  error={(dayjs(timeValue).hour() - 8) < 0 || (dayjs(timeValue).hour() + 4) > 23}
                />
                <div>
                  {(dayjs(timeValue).hour() - 8) < 0 && (dayjs(timeValue).hour() + 4) > 23}
                </div>
                <TextInput
                  label="Special notes to staff/driver"
                />
              </form>
            </Box>
            </>
          :
            <>
            <Box>
              <Select
                  label="Pick-up Location"
                  placeholder="Select Branch to pick-up"
                  data={[{value:"MainBranch", label:"Sta. Mesa Branch"}]}
                />
            </Box>
            </>
          }
        </Stepper.Step>
        <Stepper.Completed>
          Order details completed. Redirecting you to menu.... 
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        {(active != 0 && active != 3) &&<Button variant="default" onClick={prevStep}>Back</Button> }
        {(active != 1 && active != 3) && <Button onClick={nextStep}>Next step</Button>}
        {active == 3 && <Button onClick={() => {router.push("/menu"); setOrderActive(isActive); setActive(0);}}>Proceed to menu</Button>}
      </Group>
    </>
  );
}