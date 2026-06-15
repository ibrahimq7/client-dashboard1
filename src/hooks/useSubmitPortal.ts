import { useCallback, useMemo, useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { createPortalPayload, PortalPayload } from '../utils/portalUtils';
import { submitPortalData } from '../services/portalService';

export function useSubmitPortal() {
  const { state } = usePortal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string>('');

  const portalData: PortalPayload = useMemo(() => createPortalPayload(state), [state]);

  const submit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    setSubmitMessage('');

    try {
      const result = await submitPortalData(portalData);
      setSubmitSuccess(true);
      setSubmitMessage(result.message);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unknown error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  }, [portalData]);

  return {
    portalData,
    isSubmitting,
    submitSuccess,
    submitError,
    submitMessage,
    submit,
  };
}
