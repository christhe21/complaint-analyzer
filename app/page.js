'use client';

import { useState } from 'react';
import '@fontsource/roboto/500.css';
import { Box, Button, FormControl, InputLabel, OutlinedInput, Stack, TextField, Typography, } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material'


export default function Home() {
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';

      // Reading the streamed response
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value);
      }
      try {
        const parsedResult = JSON.parse(result.trim());  // Parse the result here
        setSummary(parsedResult);  // Set the parsed JSON as summary
        console.log(parsedResult);
      } catch (parseError) {
        console.error('Parsing error:', parseError);
        setSummary({ error: 'Failed to parse response' });  // Handle error
      }

    } catch (error) {
      console.error('Error:', error);
      setSummary({ error: 'There was an error processing your request.' });
    } finally {
      setIsLoading(false);
    }

  };
  const handleClear = () => {
    setTranscript(''); // Clear the input text
    setSummary('');    // Clear the summary content
  };

  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
      bgcolor="#262626"
      pb="35px"
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          width: { xs: '95%', sm: '85%', md: '70%', lg: '90%', xl: '50%' }, // Responsive width
          height: { xs: 'auto', md: '700px' }, // Height adjusts based on screen size
          border: '0.5px solid #d4d4d4', // Black border to outline the frame
          borderRadius: '10px', // Rounded corners for the frame
          backgroundColor: '#f5f5f5', // Light background color
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Light shadow for 3D effect
          padding: { xs: 2, md: 4 }, // Responsive padding
          margin: 'auto', // Center it horizontally
          mt: 4, // Margin from the top
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontFamily: 'Roboto',
            color: 'primary',
            textAlign: 'center',
            fontSize: { xs: '1.8rem', md: '2.9rem' }, // Responsive font size
          }}
        >
          Complaint Analyzer
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Roboto',
            color: 'secondary.main',
            textAlign: 'center',
            fontSize: { xs: '1.2rem', md: '1.4rem' }, // Responsive font size
            mt: 1,
          }}
        >
          Analyze Complaints on the go!
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            mt: { xs: 2, md: 4 }, // Responsive margin top
          }}
        >
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-complaint-transcript">Complaint Transcript</InputLabel>
            <OutlinedInput
              id="filled-multiline-flexible"
              label="Complaint Transcript"
              maxRows={5}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Enter the call transcript here"
              sx={{ fontFamily: 'Roboto', mr: 1 }}
            />
          </FormControl>
        </Box>

        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }} // Responsive layout for buttons
          justifyContent="center"
          alignItems="center"
          sx={{ gap: 2, pt: 3 }}
        >
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            onClick={handleClear} // Reset state on click
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </Button>
        </Box>


        {summary && (
          <Box
            sx={{
              marginTop: 2,
              width: { xs: '100%', md: '90%' },
              maxWidth: '900px',
              mx: 'auto',
              padding: 2, // Add padding to the outer box
              bgcolor: '#f5f5f5', // Background color to distinguish the box
              borderRadius: 2, // Rounded corners
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional shadow for effect
            }}
          >
            <Box
              display="flex"
              justifyContent="right"
              alignItems="right"
            >
              <Box
                onClick={handleClear}
                component="img"
                width="13px"
                src="https://www.svgrepo.com/show/402152/red-circle.svg"
                alt="Descriptive Alt Text"
                sx={{
                  cursor: 'pointer',
                }}
              />

            </Box>
            <Typography pb="30px" pt="25px" variant="h4">Complaint Summary</Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', maxWidth: '100%' }}>
              <Table sx={{ minWidth: '100%' }} aria-label="complaint summary table">
                <TableHead>
                  <TableRow>
                    <TableCell>Field</TableCell>
                    <TableCell align="left">Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">Valid Complaint</TableCell>
                    <TableCell>{summary.isComplaint ? 'Yes' : 'No'}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">Description</TableCell>
                    <TableCell>{summary.description}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">Category</TableCell>
                    <TableCell>{summary.category}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">Subcategory</TableCell>
                    <TableCell>{summary.subCategory}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell component="th" scope="row">Status</TableCell>
                    <TableCell>{summary.status}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Box>
  );

}
