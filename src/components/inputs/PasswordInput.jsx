import { RestartAlt, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { GenerateId } from 'helpers/generate-id';
import { useState } from 'react';

export function PasswordInput({ generate, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((currentValue) => !currentValue);
  };

  const handleClickShowPassword = () => {
    toggleVisibility();
  };

  const handleMouseDownPassword = () => {
    toggleVisibility();
  };

  const onGenerateButtonClick = () => {
    const newPassword = GenerateId(15);
    props?.onChange({ target: { name: props.name, value: newPassword } });
  };

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        startAdornment: generate ? (
          <InputAdornment position="end">
            <IconButton onClick={onGenerateButtonClick} edge="start">
              <RestartAlt />
            </IconButton>
          </InputAdornment>
        ) : null,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}
