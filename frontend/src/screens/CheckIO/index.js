import React, { useState, useEffect } from 'react';
import { Button, Typography, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { CheckCircleOutline, ArrowForward } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../states/reducers/slices/backend/UserSlice';
import { markAttendance } from '../../api/attendence';

const CheckInCheckOut = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(
    localStorage.getItem('isCheckedIn') === 'true' || false
  );
  const [checkInTime, setCheckInTime] = useState(
    localStorage.getItem('checkInTime') || null
  );
  const [elapsedTime, setElapsedTime] = useState(
    Number(localStorage.getItem('elapsedTime')) || 0
  );

  const c_user = useSelector(selectCurrentUser)
  const user = c_user._id
  

  useEffect(() => {
    let interval;

    if (isCheckedIn) {
      const startTime = new Date(checkInTime);
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now - startTime) / 1000);
        setElapsedTime(elapsed);
        localStorage.setItem('elapsedTime', String(elapsed));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isCheckedIn, checkInTime]);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setCheckInTime(new Date());
    localStorage.setItem('isCheckedIn', 'true');
    localStorage.setItem('checkInTime', new Date().toString());
    const formData = {
      user: user,
      date: new Date().toISOString().split('T')[0], 
      checkIn: checkInTime,
    };

    markAttendance(formData)
  
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setCheckInTime(null);
    localStorage.setItem('isCheckedIn', 'false');
    const formData = {
      user: user,
      date: new Date().toISOString().split('T')[0], 
      checkOut: new Date().toLocaleTimeString(),
    };

    markAttendance(formData)

  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const resetTimer = () => {
    const now = new Date();
    const lastCheckInDate = new Date(checkInTime);

    if (lastCheckInDate.getDate() !== now.getDate()) {
      setElapsedTime(0);
      localStorage.setItem('elapsedTime', '0');
    }
  
  };

  useEffect(() => {
    resetTimer();
  }, []);

  return (
    <Card className='py-20'>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {isCheckedIn ? 'Checked In' : 'Checked Out'}
        </Typography>
        {isCheckedIn && checkInTime && (
          <Typography variant="body2">
            Checked in at {new Date(checkInTime).toLocaleTimeString()}.
          </Typography>
        )}
        {isCheckedIn && (
          <Typography variant="body2">
            Elapsed Time: {formatTime(elapsedTime)}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {!isCheckedIn ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckIn}
            startIcon={<CheckCircleOutline />}
          >
            Check In
          </Button>
        ) : (
          <>
            <IconButton onClick={handleCheckOut}>
              <ArrowForward />
            </IconButton>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCheckOut}
              endIcon={<CheckCircleOutline />}
            >
              Check Out
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default CheckInCheckOut;
