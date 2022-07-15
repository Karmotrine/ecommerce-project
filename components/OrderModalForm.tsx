import { useState, useEffect } from 'react';
import { Stepper, Button, Group , Box,
         TextInput, Select, Center, Text, Stack, Anchor, Collapse, Divider, Space, LoadingOverlay } from '@mantine/core';
import { TimeInput, DatePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { Clock, BuildingStore, Motorbike, CirclePlus } from 'tabler-icons-react';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth } from '../lib/firebaseClient';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router'
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
import useOrderModal from './hooks/useOrderModal';
import { useUser } from '../lib/hooks/useUser';
import { useAddresses } from '../lib/hooks/useAdresses';
import { regions, provinces, 
         citiesMunicipalities, usePHAddressForms } from '../lib/usePHAddressForms';
import { Address } from '../lib/types';
import {v4 as uuidgen} from "uuid"
import { useLocalStorage } from "@mantine/hooks"
import superjson from 'superjson';

function isJSON (jsonString:string) {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed && typeof(parsed) === "object") {
      return true
    }
  } catch (err) {
      return false
  }
  return false
}

export default function OrderModalForm() {
  const user = useUser();
  const router = useRouter()
  const { isActive, setOrderActive } = useOrderModal((state) => state);
  const [active, setActive] = useState(0);
  const nextStep = () => {
    const thisAddressObject = getAddress(superjson.parse(selectedId));
    const deliDateTime = dateValue
    deliDateTime.setHours(timeValue.getHours())
    deliDateTime.setMinutes(timeValue.getMinutes())
    if (orderType === "2") {
      setDetails({
        savedAddress:thisAddressObject,
        savedDeliDateTime: deliDateTime,
        savedNotes:notesValue,
        savedOrderType: orderType,
        savedBranch: branchCode,
      });
    } else {
      setDetails({
        savedAddress:null,
        savedDeliDateTime: deliDateTime,
        savedNotes:notesValue,
        savedOrderType: orderType,
        savedBranch: branchCode,
      });
    }

    setActive((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [orderType, setOrderType] = useState("0"); // 1 - pick-up, 2 - delivery
  const { addAddress, addresses, getAddress, isEmpty } = useAddresses()
  const [addAddressForm, setAddressForm] = useState(false)
  const { getProvincesByRegion, getCityMunByProvince, sort } = usePHAddressForms()
  const [ regionValue, setRegionValue ] = useState("")
  const [ provinceValue, setProvinceValue ] = useState("")
  const [ cityValue, setCityValue ] = useState("")
  const [ otherAddressInfo, setOtherAddressInfo ] = useState({
    nickname:"",
    recipient:"",
    addressline:"",
    postalcode:"",
  })
  const [dateValue, setDateValue] = useState<Date | null>(new Date())
  const [timeValue, setTimeValue] = useState(new Date())
  const [notesValue, setNotesValue] = useState("")
  const [selectedId, setSelectedId] = useState<string>("")
  const [branchCode, setBranchCode] = useState("0")

  
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

  const [details, setDetails] = useLocalStorage({
    key: "orderExDetails",
    defaultValue: {
        savedAddress: null,
        savedDeliDateTime: null,
        savedNotes: null,
        savedOrderType: null,
        savedBranch: null,
    },
    serialize: superjson.stringify,
    deserialize: (str) => (str === undefined ?
        {
            savedAddress: null,
            savedDeliDateTime: null,
            savedNotes: null,
            savedOrderType: null,
            savedBranch: null,
        } : superjson.parse(str)),
    })
  

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
              onClick={() => {setOrderType("1"); setActive((current) => (current < 3 ? current + 1 : current))}}
              size={"xl"}
              color="red"
            >
              <Stack spacing={0}>
                <Center><BuildingStore size={32} color="white"/></Center>
                <Center><Text>Pick-up</Text></Center>
              </Stack>
            </Button>
            <Button 
              onClick={() => {setBranchCode("0"); setOrderType("2"); setActive((current) => (current < 3 ? current + 1 : current))}}
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
          {(orderType !== "0" && orderType === "2") ? 
            <>
            <Box>
              <form>
                  <Select
                    label="Delivery Location"
                    placeholder="Choose address"
                    data={!!addresses ? addresses.map((item:Address) => 
                                      ({value: superjson.stringify(item),
                                      label: `${item.nameId} (${item.metadata.addressLine}, ${item.metadata.cityMun}, ${item.metadata.province}, ${item.metadata.region}, ${item.metadata.postalCode})`})
                          ) : [{label: "", value: ""}]
                        }   //load useAddress()
                    disabled={isEmpty}
                    value={selectedId}
                    onChange={setSelectedId}
                    required
                    error={selectedId === ""}
                  />
                <Anchor style={{color:"inherit"}} onClick={() => setAddressForm((state) => !state)}>
                  <Text size="xs" style={{color: "red",  display:"flex", justifyContent: "flex-end"}}>
                    Add address
                  </Text>
                </Anchor>
                <Collapse in={addAddressForm}>
                  <form>
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
                      required
                      error={otherAddressInfo.nickname === ""}
                    />
                    <TextInput
                      label="Recipient Name"
                      value={otherAddressInfo.recipient}
                      onChange={(event) => {
                          const {target} = event;
                          setOtherAddressInfo(prevState =>({...prevState, recipient:target.value}))
                        }
                      }
                      required
                      error={otherAddressInfo.recipient === ""}
                    />
                    <TextInput
                      label="Address Line 1"
                      value={otherAddressInfo.addressline}
                      onChange={(event) => {
                          const {target} = event;
                          setOtherAddressInfo(prevState =>({...prevState, addressline:target.value}))
                        }
                      }
                      required
                      error={otherAddressInfo.addressline === ""}
                    />
                    <Select
                      label="Region"
                      placeholder="Region"
                      searchable
                      data={regions.map((region) => region.name)}
                      maxDropdownHeight={250}
                      value={regionValue}
                      onChange={setRegionValue}
                      required
                      error={regionValue === ""}
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
                      required
                      error={regionValue === ""}
                    />
                    <Select
                      label="City/Municipality"
                      placeholder="City/Municipality"
                      searchable
                      disabled={provinceValue === ""}
                      data={provinceValue === "" ? [""] :
                            getCityMunByProvince(provinceValue).map((city) => city.name)}
                      maxDropdownHeight={250}
                      value={cityValue}
                      onChange={setCityValue}
                      required
                      error={regionValue === ""}
                    />
                    <TextInput
                      label="Postal Code"
                      value= {otherAddressInfo.postalcode}
                      onChange={(event) => {
                        const {target} = event;
                        setOtherAddressInfo(prevState => ({...prevState, postalcode: event.target.value}))}
                      }
                      required
                      error={regionValue === ""}
                    />
                    <Space py={8} />
                    <Center>
                      <Button 
                        color="red" 
                        style={{width:200}}
                        disabled={
                          otherAddressInfo.recipient === "" || otherAddressInfo.nickname === "" ||
                          regionValue === "" || provinceValue === "" || cityValue === "" || 
                          otherAddressInfo.addressline === "" || otherAddressInfo.postalcode === ""
                        }
                        onClick={() => {
                          addAddress({
                            uid: uuidgen(),
                            recipientName: otherAddressInfo.recipient,
                            nameId: otherAddressInfo.nickname,
                            metadata: {
                                region: regionValue,
                                province: provinceValue,
                                cityMun: cityValue,
                                addressLine: otherAddressInfo.addressline,
                                postalCode: otherAddressInfo.postalcode
                            }
                          });
                          setAddressForm(false);
                        }}
                      >
                        <CirclePlus/>
                      </Button>
                    </Center>
                  </form>
                    <Space py={3}/>
                    
                  <Space py={6}/>
                  <Divider/>
                </Collapse>
                    <DatePicker
                      placeholder="Delivery date"
                      label="Delivery date"
                      minDate={dayjs(dateValue).toDate()}
                      maxDate={dayjs(dateValue).add(2, 'days').toDate()}
                      value={dateValue}
                      onChange={setDateValue}
                      required
                    />
                <TimeInput
                  label="Delivery time"
                  placeholder="Delivery time"
                  icon={<Clock size={16} />}
                  defaultValue={timeValue}
                  format="12"
                  onChange={setTimeValue}
                  error={(dayjs(timeValue).hour() - 8) < 0 || (dayjs(timeValue).hour() + 4) > 23}
                  required
                />
                <div>
                  {(dayjs(timeValue).hour() - 8) < 0 && (dayjs(timeValue).hour() + 4) > 23}
                </div>
                <TextInput
                  label="Special notes to staff/driver"
                  value={notesValue}
                  onChange={(event) => {
                    const { target } = event
                    setNotesValue(target.value)}}
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
                  data={[{value:"0", label:"Sta. Mesa Branch"}]}
                  value={branchCode}
                  onChange={setBranchCode}
              />
              <DatePicker
                placeholder="Pickup date"
                label="Pickup date"
                minDate={dayjs(dateValue).toDate()}
                maxDate={dayjs(dateValue).add(2, 'days').toDate()}
                value={dateValue}
                onChange={setDateValue}
                required
              />
              <TimeInput
                label="Pickup time"
                placeholder="Pickup time"
                icon={<Clock size={16} />}
                defaultValue={timeValue}
                format="12"
                onChange={setTimeValue}
                error={(dayjs(timeValue).hour() - 8) < 0 || (dayjs(timeValue).hour() + 4) > 23}
                required
              />
              <TextInput
                label="Extra notes to staff"
                value={notesValue}
                onChange={(event) => {
                  const { target } = event
                  setNotesValue(target.value)}}
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
        {(active == 2) && 
              <Button 
                disabled = {
                    !isJSON(selectedId) ||
                    (dayjs(timeValue).hour() - 8) < 0 || (dayjs(timeValue).hour() + 4) > 23
                }
                onClick={
                  nextStep
                } 
                color="red"
                >
                  Next step
                </Button>
          }
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