import { useEffect } from 'react';
import { useParams, useNavigate } from 'remix';

// FIY: Just for redirect to 'defaut' $version
const CreateIndex = () => {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!params?.version) navigate('./default');
  }, []);

  return null;
};

export default CreateIndex;
