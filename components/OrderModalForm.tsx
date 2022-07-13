import { useState, useEffect } from 'react';
import { Stepper, Button, Group , Box,
         TextInput, Select, Center, Text, Stack, Anchor, Collapse, Divider, Space } from '@mantine/core';
import { TimeInput, DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { Clock, BuildingStore, Motorbike, CirclePlus } from 'tabler-icons-react';
import LoginView from './auth/LoginView';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth } from '../lib/firebaseClient';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import next from 'next';
import { useRouter } from 'next/router'
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
import useOrderModal from './hooks/useOrderModal';
import { useUser } from '../lib/hooks/useUser';
import { useAddresses } from '../lib/hooks/useAdresses';
import { regions, provinces, 
         citiesMunicipalities, usePHAddressForms } from '../lib/usePHAddressForms';
import { Address } from '../lib/types';

export default function OrderModalForm() {
  const user = useUser();
  const now = new Date();
  const { isActive, setOrderActive } = useOrderModal((state) => state);
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const [orderType, setOrderType] = useState(0);
  const [timeValue, setTimeValue] = useState(new Date())
  const router = useRouter()

  const { addAddress, addresses } = useAddresses()
  const [addAddressForm, setAddressForm] = useState(false)
  const { getProvincesByRegion, getCityMunByProvince, sort } = usePHAddressForms()
  const [ regionValue, setRegionValue ] = useState("")
  const [ provinceValue, setProvinceValue ] = useState("")
  const [ cityValue, setCityValue ] = useState("")
  const [ otherAddressInfo, setOtherAddressInfo ] = useState({
    nickname:"",
    recipient:"",
    addressline:"",
    postalcode:""
  })

  useEffect(() => {
    setActive(user.data ? 1 : 0)
  }, [user.data, isActive]);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: function () {
          nextStep;
          return false;
      },
    },
  }
  

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm" color="red">
        <Stepper.Step label="First step" description="Account Log-in" allowStepSelect={user.data == null}>
         <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Select Order type"allowStepSelect={active > 1}>
          <Group
            position={"center"}
            spacing={"md"}
          >
            <Button
              onClick={() => {setOrderType(2); setActive((current) => (current < 3 ? current + 1 : current))}}
              size={"xl"}
              color="red"
            >
              <Stack spacing={0}>
                <Center><BuildingStore size={32} color="white"/></Center>
                <Center><Text>Pick-up</Text></Center>
              </Stack>
            </Button>
            <Button 
              onClick={() => {setOrderType(1); setActive((current) => (current < 3 ? current + 1 : current))}}
              color="red"
              size={"xl"}
            >
              <Stack spacing={0}>
                <Center><Motorbike size={32} color="white"/></Center>
                <Center><Text>Delivery</Text></Center>
              </Stack>
            </Button>
          </Group>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Set order details" allowStepSelect={active > 2}>
          {(orderType != 0 && orderType == 1) ? 
            <>
            <Box>
              <form>
                <Select
                  label="Delivery Location"
                  placeholder="Choose address"
                  data={!!addresses ? addresses.map((item:Address) => 
                                    ({value: `${item.metadata.addressLine}, ${item.metadata.cityMun}, ${item.metadata.province}, ${item.metadata.region}, ${item.metadata.postalCode}`, 
                                    label: item.nameId})
                        ) : [{value: ""}]
                      }   //load useAddress()
                />
                <Anchor style={{color:"inherit"}} onClick={() => setAddressForm((state) => !state)}>
                  <Text size="xs" style={{color: "red",  display:"flex", justifyContent: "flex-end"}}>
                    Add address
                  </Text>
                </Anchor>
                <Collapse in={addAddressForm}>
                  <Space py={6}/>
                  <Divider />
                  <Space py={3}/>
                    <TextInput
                      label="Address Nickname"
                      value={otherAddressInfo.nickname}
                      onChange={(event)=>{
                          const { target } = event;
                          setOtherAddressInfo(prevState =>({...prevState, nickname:target.value}))
                        }
                      }
                    />
                    <TextInput
                      label="Recipient Name"
                      value={otherAddressInfo.recipient}
                      onChange={(event) => {
                          const {target} = event;
                          setOtherAddressInfo(prevState =>({...prevState, recipient:target.value}))
                        }
                      }
                    />
                    <TextInput
                      label="Address Line 1"
                      value={otherAddressInfo.addressline}
                      onChange={(event) => {
                          const {target} = event;
                          setOtherAddressInfo(prevState =>({...prevState, addressline:target.value}))
                        }
                      }
                    />
                    <Select
                      label="Region"
                      placeholder="Region"
                      searchable
                      data={regions.map((region) => region.name)}
                      maxDropdownHeight={250}
                      value={regionValue}
                      onChange={setRegionValue}
                    />
                    <Select
                      label="Province"
                      placeholder="Province"
                      searchable
                      disabled={regionValue === ""}
                      data={
                        regionValue === "" ? [""] :
                        getProvincesByRegion(regionValue).map((province) => province.name)
                      }
                      maxDropdownHeight={250}
                      value={provinceValue}
                      onChange={setProvinceValue}
                    />
                    <Select
                      label="City/Municipality"
                      placeholder="City/Municipality"
                      disabled={provinceValue === ""}
                      data={provinceValue === "" ? [""] :
                            getCityMunByProvince(provinceValue).map((city) => city.name)}
                      maxDropdownHeight={250}
                      value={cityValue}
                      onChange={setCityValue}
                    />
                    <TextInput
                      label="Postal Code"
                      value= {otherAddressInfo.postalcode}
                      onChange={(event) => {
                        const {target} = event;
                        setOtherAddressInfo(prevState => ({...prevState, postalcode: event.target.value}))}
                      }
                    />
                    <Space py={8} />
                    <Center>
                      <Button 
                        color="red" 
                        style={{width:200}}
                        onClick={() => {
                          const payload: Address = {
                            uid: user.data.uid,
                            recipientName: otherAddressInfo.recipient,
                            nameId: otherAddressInfo.nickname,
                            metadata: {
                                region: regionValue,
                                province: provinceValue,
                                cityMun: cityValue,
                                addressLine: otherAddressInfo.addressline,
                                postalCode: otherAddressInfo.postalcode
                            }
                          }
                          addAddress(payload);
                          setAddressForm((state) => false);
                        }}
                      >
                        <CirclePlus/>
                      </Button>
                    </Center>
                    <Space py={3}/>
                    
                  <Space py={6}/>
                  <Divider/>
                </Collapse>
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
        {(active >= 2) &&<Button variant="default" onClick={prevStep}>Back</Button> }
        {(active == 2) && <Button onClick={nextStep} color="red">Next step</Button>}
        {active == 3 && 
        <Button 
          onClick={() => {router.push("/menu"); setOrderActive(isActive); setActive(0);}}
          color="red"
        >Proceed to menu
        </Button>}
      </Group>
    </>
  );
}