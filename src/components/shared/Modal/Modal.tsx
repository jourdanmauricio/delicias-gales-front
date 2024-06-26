import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import CloseSquareIcon from '../../../icons/closeSquare';

function Modal({
  children,
  isOpenModal,
  closeModal,
  width = 'full',
}) {
  const handleClickContainer = (e) => e.stopPropagation();

  return ReactDOM.createPortal(
    <section
      className={`${styles.modal} ${isOpenModal && styles.is_open
        }`}
      onClick={closeModal}
    >
      <div
        className={`${styles.modal_container} ${width === 'full' ? 'max-w-full' : 'max-w-md'
          }`}
        onClick={handleClickContainer}
      >
        <button
          type='button'
          onClick={closeModal}
          className={styles.modal_close}
        >
          <CloseSquareIcon className='w-6 h-6' />
        </button>
        {children}
      </div>
    </section >,

    document.getElementById('modal')
  );
}

export { Modal };
