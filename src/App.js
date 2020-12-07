import { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import './style.css';
import { Container } from 'react-bootstrap';
import Navbar from './navbar';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
import Spinner from 'react-bootstrap/Spinner';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams(prevParams => {
      return { ...prevParams, [param]: value };
    });
  }

  return (
    <Container className='my-4'>
      <Navbar />
      <SearchForm params={params} onParamChange={handleParamChange} />
      <hr className='mt-3'></hr>
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && (
        <Spinner
          animation='border'
          variant='secondary'
          role='status'
          className='mb-3'
        >
          <h4 className='sr-only ml-3'>Loading...</h4>
        </Spinner>
      )}
      {error && <h4 className='ml-3'>Oops. please refresh.</h4>}
      {jobs.map(job => {
        return <Job key={job.id} job={job} />;
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
