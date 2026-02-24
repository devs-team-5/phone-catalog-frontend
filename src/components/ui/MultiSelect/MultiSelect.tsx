import * as React from 'react';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

import styles from './MultiSelect.module.scss';
import { Typography } from '../Typography/Typography';

type MultiSelectContextValue = {
  value: string[];
  onValueChange: (value: string[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const MultiSelectContext = React.createContext<
  MultiSelectContextValue | undefined
>(undefined);

const useMultiSelectContext = () => {
  const context = React.useContext(MultiSelectContext);
  if (!context) {
    throw new Error('useMultiSelectContext must be used within a MultiSelect');
  }
  return context;
};

export interface MultiSelectProps {
  value?: string[];
  onValueChange?: (value: string[]) => void;
  children: React.ReactNode;
}

const MultiSelect = ({
  value = [],
  onValueChange,
  children,
}: MultiSelectProps) => {
  const [open, setOpen] = React.useState(false);

  const handleValueChange = (newValue: string[]) => {
    onValueChange?.(newValue);
  };

  return (
    <MultiSelectContext.Provider
      value={{ value, onValueChange: handleValueChange, open, setOpen }}
    >
      <DropdownMenuPrimitive.Root
        open={open}
        onOpenChange={setOpen}
      >
        {children}
      </DropdownMenuPrimitive.Root>
    </MultiSelectContext.Provider>
  );
};

const MultiSelectTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    className={cn(styles.trigger, className)}
    {...props}
  >
    {children}
    <ChevronDownIcon className={styles.icon} />
  </DropdownMenuPrimitive.Trigger>
));
MultiSelectTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

const MultiSelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    placeholder?: string;
    maxDisplay?: number;
    displayValues?: Record<string, string>;
  }
>(({ className, placeholder, maxDisplay = 2, displayValues }) => {
  const { value } = useMultiSelectContext();

  const displayText = React.useMemo(() => {
    if (value.length === 0) return placeholder;
    if (value.length > maxDisplay) return `${value.length} selected`;

    return value.map((v) => displayValues?.[v] || v).join(', ');
  }, [value, placeholder, maxDisplay, displayValues]);

  return (
    <Typography
      variant="body"
      color="inherit"
      tag="span"
      className={cn('truncate text-left flex-1', className)}
      //ref={ref}
      //{...props}
    >
      {displayText}
    </Typography>
  );
});
MultiSelectValue.displayName = 'MultiSelectValue';

const MultiSelectContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      className={cn(styles.content, className)}
      align="start"
      sideOffset={5}
      style={{
        width: 'var(--radix-dropdown-menu-trigger-width)',
        ...props.style,
      }}
      {...props}
    >
      <div className={styles.viewport}>{children}</div>
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
));
MultiSelectContent.displayName = DropdownMenuPrimitive.Content.displayName;

const MultiSelectLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(styles.label, className)}
    {...props}
  />
));
MultiSelectLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const MultiSelectItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  Omit<
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    'checked' | 'onCheckedChange'
  > & { value: string }
>(({ className, children, value: itemValue, ...props }, ref) => {
  const { value, onValueChange } = useMultiSelectContext();
  const checked = value.includes(itemValue);

  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(styles.item, className)}
      checked={checked}
      onCheckedChange={(isChecked) => {
        if (isChecked) {
          onValueChange([...value, itemValue]);
        } else {
          onValueChange(value.filter((v) => v !== itemValue));
        }
      }}
      onSelect={(e) => {
        e.preventDefault();
      }}
      {...props}
    >
      <Typography
        variant="body"
        color="inherit"
        tag="span"
        className="flex-1 text-left"
      >
        {children}
      </Typography>
      <span className={styles.itemIndicator}>
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
MultiSelectItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const MultiSelectSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-slate-100', className)}
    {...props}
  />
));
MultiSelectSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectLabel,
  MultiSelectItem,
  MultiSelectSeparator,
};
