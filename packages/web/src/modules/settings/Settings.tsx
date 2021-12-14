import React, { useEffect, useState } from 'react';
import Input from '@ui/Input';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchSettingsAC, selectSettings } from './settingsSlice';
import Button, { ButtonSize } from '@ui/Button';
import { setSettingsAC } from './settingsSlice';

const Settings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const [currentSettings, setCurrentSettings] = useState(settings || {});

  useEffect(() => {
    if (!settings) dispatch(fetchSettingsAC());
  }, [dispatch, settings]);

  const handleChange = (name: string) => (value: string) => {
    setCurrentSettings({
      ...currentSettings,
      [name]: value,
    });
  };

  const handleSave = () => {
    dispatch(setSettingsAC(currentSettings));
  };

  return (
    <div>
      {JSON.stringify(settings)}
      <Input onChange={handleChange('curseApiKey')} />
      <Button size={ButtonSize.Small} text="Save" onClick={handleSave} />
    </div>
  );
};

export default Settings;
