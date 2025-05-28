import React from "react";
import Form from "@rjsf/mui";
import PropTypes from "prop-types";
import {
  CustomTextFieldComponent,
  CustomNumberFieldComponent,
  CustomRadioComponent,
  CustomHeaderComponent,
  CustomSelectComponent,
  CustomMultiSelectComponent,
  CustomTextAreaComponent,
  CustomPasswordFieldComponent,
  CustomDateFieldComponent,
  CustomTimeFieldComponent,
} from "../components/customWidgets";

function FormWithWidgets({
  schema,
  uiSchema,
  formData,
  validator,
  readonly,
  liveValidate,
  onSubmit,
  children,
}) {
  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      validator={validator}
      readonly={readonly}
      liveValidate={liveValidate}
      onSubmit={onSubmit}
      // eslint-disable-next-line react/no-children-prop
      children={children}
      widgets={{
        TextWidget: CustomTextFieldComponent,
        UpDownWidget: CustomNumberFieldComponent,
        CustomRadio: CustomRadioComponent,
        CustomHeader: CustomHeaderComponent,
        CustomSelect: CustomSelectComponent,
        CustomMultiSelect: CustomMultiSelectComponent,
        TextareaWidget: CustomTextAreaComponent,
        PasswordWidget: CustomPasswordFieldComponent,
        DateWidget: CustomDateFieldComponent,
        TimeWidget: CustomTimeFieldComponent,
      }}
    />
  );
}

FormWithWidgets.propTypes = {
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object.isRequired,
  formData: PropTypes.object,
  validator: PropTypes.object,
  readonly: PropTypes.bool,
  liveValidate: PropTypes.bool,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

export default FormWithWidgets;
