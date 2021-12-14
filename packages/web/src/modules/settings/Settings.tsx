import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Input from '@ui/Input';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchSettingsAC, selectSettings } from './settingsSlice';
import Button, { ButtonSize } from '@ui/Button';

import { setSettingsAC } from './settingsSlice';
import styles from './Settings.module.css';
import Label from '@ui/Label';

const Settings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const [currentSettings, setCurrentSettings] = useState(settings);

  useEffect(() => {
    if (!settings) dispatch(fetchSettingsAC());
  }, [dispatch, settings]);

  useEffect(() => {
    setCurrentSettings(settings);
  }, [settings]);

  const handleChange = (name: string) => (value: string) => {
    setCurrentSettings({
      ...currentSettings,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (currentSettings) dispatch(setSettingsAC(currentSettings));
  };

  return (
    <div className={cn(styles.settings)}>
      <section className={cn(styles.section)}>
        <Label text="Curse API Key" />
        <Input
          onChange={handleChange('curseApiKey')}
          value={currentSettings?.curseApiKey || ''}
        />
      </section>
      <section className={cn(styles.section)}>
        <Button size={ButtonSize.Small} text="Save" onClick={handleSave} />
      </section>
    </div>
  );
};

export default Settings;
