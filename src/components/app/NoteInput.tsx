import React, { useImperativeHandle, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';

import { StarEmptyIcon } from '../icons/star-empty';
import { StarIcon } from '../icons/star';
import {
  NoteContentEntity,
  NoteEntity,
} from '../../lib/api/domain/entities/note.entity';
import { SendIcon } from '../icons/send';

export type NoteInputRef = {
  setFields(fields: NoteEntity): void;
  getEdit(): NoteEntity | null;
  updateEdit(
    fields: NoteEntity,
    updatedData: Partial<Omit<NoteContentEntity, 'color'>>,
  ): void;
  reset(): void;
};

interface NoteInputProps {
  onCreate(data: Omit<NoteContentEntity, 'color'>): void;
  onUpdate(
    oldData: NoteEntity,
    updatedData: Omit<NoteContentEntity, 'color'>,
  ): void;
}

const NoteInputComponent = (
  props: NoteInputProps,
  ref: React.Ref<NoteInputRef>,
) => {
  const originalDataEditRef = useRef<NoteEntity | null>(null);
  const { register, control, setValue, reset, handleSubmit, setFocus } =
    useForm<NoteContentEntity>();

  useImperativeHandle(
    ref,
    () => ({
      setFields(data) {
        const { title, description, hasFavorited } = data;
        originalDataEditRef.current = data;
        setValue('title', title);
        setValue('description', description);
        setValue('hasFavorited', hasFavorited);
        setFocus('title');
      },
      getEdit() {
        return originalDataEditRef.current;
      },
      updateEdit(fields, { title, description, hasFavorited }) {
        originalDataEditRef.current = fields;
        if (title) setValue('title', title);
        if (description) setValue('description', description);
        if (typeof hasFavorited !== 'undefined')
          setValue('hasFavorited', hasFavorited);
      },
      reset() {
        resetFields();
        originalDataEditRef.current = null;
      },
    }),
    [setValue, setFocus, reset],
  );

  const onSubmitData = handleSubmit(
    (data) => {
      const oldData = originalDataEditRef.current;
      if (oldData) props.onUpdate(oldData, data);
      else props.onCreate(data);
      originalDataEditRef.current = null;
      resetFields();
    },
    () => {
      toast.warn('Preencha todos os campos com 3 ou mais caracteres.', {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  );

  const resetFields = () => {
    reset({
      title: '',
      description: '',
      hasFavorited: false,
    });
  };

  return (
    <div className="flex w-full justify-center px-10">
      <div className="relative w-full max-w-xl rounded-lg border-[1.8px] border-capuccino-600 bg-white shadow-md shadow-capuccino-600">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="w-full">
            <input
              data-testid="input-title"
              className="w-full font-bold text-capuccino-800 outline-none placeholder:text-capuccino-800"
              type="text"
              placeholder="Título"
              {...register('title', {
                required: true,
                minLength: 3,
                maxLength: 50,
              })}
            />
          </div>
          <div>
            <Controller
              name="hasFavorited"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <button
                  data-testid="btn-favorite"
                  onClick={() => field.onChange(!field.value)}
                >
                  {field.value ? (
                    <StarIcon className="h-5 w-5" />
                  ) : (
                    <StarEmptyIcon className="h-5 w-5" />
                  )}
                </button>
              )}
            />
          </div>
        </div>
        <div className="h-[1px] w-full bg-capuccino-600" />
        <div className="sticky">
          <textarea
            data-testid="input-description"
            className="flex w-full resize-none bg-transparent px-5 py-2 pb-10 text-capuccino-900 outline-none placeholder:text-capuccino-900"
            placeholder="Criar nota..."
            {...register('description', {
              required: true,
              minLength: 3,
              maxLength: 1000,
            })}
          />
        </div>
        <div className="flex justify-end pb-1 pr-1">
          <button
            data-testid="button-submit"
            onClick={onSubmitData}
            className="grid h-10 w-10 place-items-center rounded-full"
          >
            <SendIcon className="-mr-1 h-6" />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export const NoteInput = React.forwardRef(NoteInputComponent);
