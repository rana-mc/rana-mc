import { Radio, Stack, RadioGroup } from 'rsuite';
import SelectIcon from '../SelectIcon';

const ForgeSelector = () => {
  const handleChange = () => {
    console.log(123);
  };

  return (
    <RadioGroup
      className="coreVersionSelect"
      inline
      name="coreVersionSelect"
      onChange={handleChange}
    >
      <Radio value="test">
        <Stack direction="row" spacing={8} alignItems="flex-start">
          <SelectIcon name="minecraft" />
          test
        </Stack>
      </Radio>
    </RadioGroup>
  );
};

export default ForgeSelector;
