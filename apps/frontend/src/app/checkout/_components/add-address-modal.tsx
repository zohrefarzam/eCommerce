'use client';

import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import type { LeafletMouseEvent } from 'leaflet';
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { Button } from '@/components/base/button';
import { Input } from '@/components/base/input';
import { Modal } from '@/components/base/modal';
import { Select } from '@/components/base/select';
import type { Locale } from '@/i18n/config';
import type { Messages } from '@/i18n/messages';
import type {
  CheckoutAddress,
  CheckoutAddressInput,
} from '@/lib/checkout-data';

type AddAddressModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  locale: Locale;
  labels: Messages['checkout'];
  initial?: CheckoutAddress | null;
  onSave: (input: CheckoutAddressInput) => void;
};

const defaultCoordinatesFa: [number, number] = [35.6892, 51.389];
const defaultCoordinatesEn: [number, number] = [41.6611, -72.7795];

const provinceOptionsFa = [
  { id: 'تهران', label: 'تهران' },
  { id: 'البرز', label: 'البرز' },
  { id: 'اصفهان', label: 'اصفهان' },
  { id: 'خراسان رضوی', label: 'خراسان رضوی' },
];

const cityOptionsByProvinceFa: Record<string, { id: string; label: string }[]> =
  {
    تهران: [
      { id: 'تهران', label: 'تهران' },
      { id: 'شهریار', label: 'شهریار' },
      { id: 'پردیس', label: 'پردیس' },
    ],
    البرز: [
      { id: 'کرج', label: 'کرج' },
      { id: 'فردیس', label: 'فردیس' },
      { id: 'هشتگرد', label: 'هشتگرد' },
    ],
    اصفهان: [
      { id: 'اصفهان', label: 'اصفهان' },
      { id: 'کاشان', label: 'کاشان' },
      { id: 'نجف‌آباد', label: 'نجف‌آباد' },
    ],
    'خراسان رضوی': [
      { id: 'مشهد', label: 'مشهد' },
      { id: 'نیشابور', label: 'نیشابور' },
      { id: 'سبزوار', label: 'سبزوار' },
    ],
  };

const provinceOptionsEn = [
  { id: 'Connecticut', label: 'Connecticut' },
  { id: 'South Dakota', label: 'South Dakota' },
  { id: 'California', label: 'California' },
];

const cityOptionsByProvinceEn: Record<string, { id: string; label: string }[]> =
  {
    Connecticut: [
      { id: 'Syracuse', label: 'Syracuse' },
      { id: 'Hartford', label: 'Hartford' },
      { id: 'New Haven', label: 'New Haven' },
    ],
    'South Dakota': [
      { id: 'San Jose', label: 'San Jose' },
      { id: 'Sioux Falls', label: 'Sioux Falls' },
      { id: 'Rapid City', label: 'Rapid City' },
    ],
    California: [
      { id: 'Los Angeles', label: 'Los Angeles' },
      { id: 'San Francisco', label: 'San Francisco' },
      { id: 'San Diego', label: 'San Diego' },
    ],
  };

const emptyForm: CheckoutAddressInput = {
  label: '',
  tag: 'home',
  recipientName: '',
  province: '',
  city: '',
  street: '',
  postalCode: '',
  phone: '',
};

function extractSegment(street: string, marker: string): string {
  const pattern = new RegExp(`${marker}\\s*([^،,]+)`);
  const matched = street.match(pattern);
  return matched?.[1]?.trim() ?? '';
}

function composeStreetAddress(
  street: string,
  plaque: string,
  unit: string,
  locale: Locale,
): string {
  const base = street.trim();
  const parts = [base];
  if (plaque.trim()) {
    parts.push(locale === 'fa' ? `پلاک ${plaque.trim()}` : `#${plaque.trim()}`);
  }
  if (unit.trim()) {
    parts.push(locale === 'fa' ? `واحد ${unit.trim()}` : `Unit ${unit.trim()}`);
  }
  return parts.filter(Boolean).join(locale === 'fa' ? '، ' : ', ');
}

function AddressMapPicker({
  center,
  onPick,
}: {
  center: [number, number];
  onPick: (next: [number, number]) => void;
}) {
  useMapEvents({
    click(event: LeafletMouseEvent) {
      onPick([event.latlng.lat, event.latlng.lng]);
    },
  });

  return (
    <CircleMarker
      center={center}
      radius={11}
      pathOptions={{ color: '#ef4056', fillColor: '#ef4056', fillOpacity: 0.5 }}
    />
  );
}

function MapViewportSync({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
    map.invalidateSize();
  }, [center, map]);

  return null;
}

export function AddAddressModal({
  isOpen,
  onOpenChange,
  locale,
  labels,
  initial,
  onSave,
}: AddAddressModalProps) {
  const isFa = locale === 'fa';
  const defaultCoordinates = isFa ? defaultCoordinatesFa : defaultCoordinatesEn;
  const provinceOptions = isFa ? provinceOptionsFa : provinceOptionsEn;
  const cityOptionsByProvince = isFa
    ? cityOptionsByProvinceFa
    : cityOptionsByProvinceEn;

  const [form, setForm] = useState<CheckoutAddressInput>(emptyForm);
  const [plaque, setPlaque] = useState('');
  const [unit, setUnit] = useState('');
  const [mode, setMode] = useState<'map' | 'form'>('map');
  const [location, setLocation] =
    useState<[number, number]>(defaultCoordinates);
  const [draftLocation, setDraftLocation] =
    useState<[number, number]>(defaultCoordinates);

  useEffect(() => {
    if (isOpen) {
      const savedCoordinates: [number, number] | undefined =
        initial?.latitude != null && initial?.longitude != null
          ? [initial.latitude, initial.longitude]
          : undefined;
      const nextCoordinates = savedCoordinates ?? defaultCoordinates;
      const nextForm = initial
        ? {
            label: initial.label,
            tag: initial.tag,
            recipientName: initial.recipientName,
            province: initial.province,
            city: initial.city,
            street: initial.street,
            postalCode: initial.postalCode,
            phone: initial.phone,
            latitude: initial.latitude,
            longitude: initial.longitude,
          }
        : {
            ...emptyForm,
            province: provinceOptions[0].id,
            city: cityOptionsByProvince[provinceOptions[0].id]?.[0]?.id ?? '',
          };
      setForm(nextForm);
      setPlaque(
        initial
          ? isFa
            ? extractSegment(initial.street, 'پلاک')
            : extractSegment(initial.street, '#')
          : '',
      );
      setUnit(
        initial
          ? isFa
            ? extractSegment(initial.street, 'واحد')
            : extractSegment(initial.street, 'Unit')
          : '',
      );
      setLocation(nextCoordinates);
      setDraftLocation(nextCoordinates);
      setMode(initial ? 'form' : 'map');
    }
  }, [
    isOpen,
    initial,
    defaultCoordinates,
    provinceOptions,
    cityOptionsByProvince,
    isFa,
  ]);

  const update = <K extends keyof CheckoutAddressInput>(
    key: K,
    value: CheckoutAddressInput[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const cityOptions = cityOptionsByProvince[form.province] ?? [];

  const modalTitle = useMemo(() => {
    if (mode === 'map') return labels.mapPickerTitle;
    if (initial) return labels.editAddress;
    return labels.addAddressModalTitle;
  }, [initial, labels, mode]);

  const handleSave = () => {
    if (
      !form.province.trim() ||
      !form.city.trim() ||
      !form.street.trim() ||
      !plaque.trim() ||
      !form.postalCode.trim()
    ) {
      return;
    }

    onSave({
      ...form,
      label: form.label.trim() || `${form.city} - ${form.province}`,
      tag: form.tag ?? 'home',
      recipientName:
        form.recipientName.trim() ||
        (isFa ? 'گیرنده سفارش' : 'Order recipient'),
      phone: form.phone.trim() || (isFa ? '۰۹۱۲۰۰۰۰۰۰۰' : '(555) 000-0000'),
      street: composeStreetAddress(form.street, plaque, unit, locale),
      latitude: location[0],
      longitude: location[1],
    });
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={modalTitle}
      placement="center"
      className={mode === 'map' ? 'sm:!max-w-[760px]' : 'sm:!max-w-[720px]'}
    >
      {mode === 'map' ? (
        <div className="space-y-4">
          <p className="text-xs text-muted">{labels.mapPickerHint}</p>
          <div className="overflow-hidden rounded-xl border border-muted/20">
            <MapContainer
              center={draftLocation}
              zoom={13}
              className="h-72 w-full"
              scrollWheelZoom
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapViewportSync center={draftLocation} />
              <AddressMapPicker
                center={draftLocation}
                onPick={setDraftLocation}
              />
            </MapContainer>
          </div>
          <p className="text-center text-xs text-muted" dir="ltr">
            {draftLocation[0].toFixed(6)}, {draftLocation[1].toFixed(6)}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="primary"
              className="h-11 rounded-xl bg-[#ef4056] font-semibold text-white"
              onPress={() => {
                setLocation(draftLocation);
                setMode('form');
              }}
            >
              {labels.saveMapLocation}
            </Button>
            <Button
              variant="outline"
              className="h-11 rounded-xl"
              onPress={() => setMode('form')}
            >
              {labels.enterAddressManually}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Select
              options={provinceOptions}
              selectedKey={form.province || provinceOptions[0].id}
              onSelectionChange={(key) => {
                const province = String(key);
                const firstCity =
                  cityOptionsByProvince[province]?.[0]?.id ?? '';
                update('province', province);
                update('city', firstCity);
              }}
              aria-label={labels.province}
            />
            <Select
              options={
                cityOptions.length
                  ? cityOptions
                  : [{ id: '', label: labels.noCityOptions }]
              }
              selectedKey={form.city || cityOptions[0]?.id || ''}
              onSelectionChange={(key) => update('city', String(key))}
              aria-label={labels.city}
            />
          </div>
          <Input
            value={form.street}
            onChange={(e) => update('street', e.target.value)}
            placeholder={labels.street}
            aria-label={labels.street}
          />
          <p className="-mt-2 text-xs text-muted">{labels.addressDetailHint}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              value={plaque}
              onChange={(e) => setPlaque(e.target.value)}
              placeholder={labels.plaque}
              aria-label={labels.plaque}
              inputMode="numeric"
            />
            <Input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder={labels.unit}
              aria-label={labels.unit}
              inputMode="numeric"
            />
          </div>
          <Input
            value={form.postalCode}
            onChange={(e) => update('postalCode', e.target.value)}
            placeholder={labels.postalCode}
            aria-label={labels.postalCode}
            inputMode="numeric"
          />
          <button
            type="button"
            onClick={() => {
              setDraftLocation(location);
              setMode('map');
            }}
            className="flex w-full items-center justify-between rounded-xl border border-muted/25 px-3 py-3 text-sm transition hover:border-muted/40"
          >
            <span className="flex items-center gap-2">
              <Icon icon="lucide:map-pin" width={16} height={16} />
              {labels.selectLocationOnMap}
            </span>
            <span className="text-xs text-muted" dir="ltr">
              {location[0].toFixed(4)}, {location[1].toFixed(4)}
            </span>
          </button>
          <Button
            variant="primary"
            fullWidth
            className="h-11 rounded-xl bg-[#ef4056] font-semibold text-white"
            onPress={handleSave}
          >
            {labels.confirmAndContinue}
          </Button>
        </div>
      )}
    </Modal>
  );
}
