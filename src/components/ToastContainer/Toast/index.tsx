import React, { useEffect } from 'react';
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi'

import { ToastMessages, useToast } from '../../../hooks/Toast'

import { ToastContainer } from './styles';

interface ToastProps {
  toastData: ToastMessages
  style: object
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />
}

const Toast: React.FC<ToastProps> = ({
  toastData: { id, type, title, description },
  style
}) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id)
    }, 3000)

    // se return uma function ela é executada se o component deixa de existir, qual comp.?
    return () => {
      clearTimeout(timer)
    }
  }, [removeToast, id])

  return (
    <ToastContainer
      type={type}
      hasDescription={!!description}
      style={style}
    >
      {icons[type || 'info']}
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <button type="button" onClick={() => removeToast(id)}>
        <FiXCircle size={20} />
      </button>
    </ToastContainer>
  );
}

export default Toast;
