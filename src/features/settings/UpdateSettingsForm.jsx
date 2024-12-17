import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useEditSetting } from './useEditSetting';
function UpdateSettingsForm() {
  const {isSetting, updateSetting} = useEditSetting();
  const {isLoading, settings:{
    minBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
    breakfastPrice
  }={},} = useSettings();
  if(isLoading) return <Spinner />
  function handleUpdate(e, field) {
    const value = e.target.value;
    if (!value) return;  
    updateSetting({
      [field]: value 
    });
  }
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number'defaultValue={minBookingLength} id='min-nights'
        disabled={isSetting}
        onBlur={(e) => handleUpdate(e, 'minBookingLength')} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number'defaultValue={maxBookingLength} id='max-nights'
        disabled={isSetting}
        onBlur={(e) => handleUpdate(e, 'maxBookingLength')}  />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number'defaultValue={maxGuestPerBooking} id='max-guests' 
        disabled={isSetting}
        onBlur={(e) => handleUpdate(e, 'maxGuestPerBooking')} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number'defaultValue={breakfastPrice} id='breakfast-price'
        disabled={isSetting}
        onBlur={(e) => handleUpdate(e, 'breakfastPrice')} 
         />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
