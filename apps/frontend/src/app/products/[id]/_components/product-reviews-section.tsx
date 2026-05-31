'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/base/button';
import { Image } from '@/components/base/image';
import { Textarea } from '@/components/base/textarea';
import { cn } from '@/components/base/_lib/utils';
import type {
  ProductReview,
  ProductReviewsData,
  RatingBreakdownItem,
} from '@/app/products/_lib/product-reviews';

const INITIAL_VISIBLE = 4;
const STAR_COLOR = 'text-amber-500';

type ProductReviewsSectionProps = {
  data: ProductReviewsData;
  labels: {
    title: string;
    ofReviews: (count: number) => string;
    leaveComment: string;
    submitReview: string;
    yourRatingLabel: string;
    reviewSubmitted: string;
    viewMore: string;
  };
};

export function ProductReviewsSection({
  data,
  labels,
}: ProductReviewsSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState('');
  const [draftRating, setDraftRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const visibleReviews = expanded
    ? data.reviews
    : data.reviews.slice(0, INITIAL_VISIBLE);

  const maxBreakdownCount = useMemo(
    () => Math.max(...data.breakdown.map((b) => b.count), 1),
    [data.breakdown],
  );

  const hasMoreReviews = data.reviews.length > INITIAL_VISIBLE;

  return (
    <section
      className="rounded-xl bg-surface-secondary/50 p-4 sm:rounded-2xl sm:p-6 lg:p-8"
      aria-labelledby="product-reviews-heading"
    >
      <h2
        id="product-reviews-heading"
        className="text-lg font-bold text-foreground sm:text-xl"
      >
        {labels.title}
      </h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-10 lg:items-center">
        <RatingSummary
          average={data.averageRating}
          ofReviewsLabel={labels.ofReviews(data.totalReviews)}
        />
        <RatingBreakdownList
          items={data.breakdown}
          maxCount={maxBreakdownCount}
        />
      </div>

      <WriteReviewForm
        comment={comment}
        onCommentChange={setComment}
        rating={draftRating}
        onRatingChange={setDraftRating}
        submitted={submitted}
        onSubmit={() => {
          if (!comment.trim() || draftRating < 1) return;
          setSubmitted(true);
          setComment('');
          setDraftRating(0);
        }}
        labels={{
          placeholder: labels.leaveComment,
          yourRating: labels.yourRatingLabel,
          submit: labels.submitReview,
          success: labels.reviewSubmitted,
        }}
      />

      <ul className="mt-6 flex flex-col gap-3 sm:gap-4">
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </ul>

      {hasMoreReviews ? (
        <div className="mt-6 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 rounded-lg border-muted/30 px-5 font-medium"
            onPress={() => setExpanded((v) => !v)}
          >
            {labels.viewMore}
            <Icon
              icon="lucide:chevron-down"
              width={16}
              height={16}
              className={cn(
                'transition-transform',
                expanded ? 'rotate-180' : '',
              )}
              aria-hidden
            />
          </Button>
        </div>
      ) : null}
    </section>
  );
}

type WriteReviewFormProps = {
  comment: string;
  onCommentChange: (value: string) => void;
  rating: number;
  onRatingChange: (value: number) => void;
  submitted: boolean;
  onSubmit: () => void;
  labels: {
    placeholder: string;
    yourRating: string;
    submit: string;
    success: string;
  };
};

function WriteReviewForm({
  comment,
  onCommentChange,
  rating,
  onRatingChange,
  submitted,
  onSubmit,
  labels,
}: WriteReviewFormProps) {
  const canSubmit = comment.trim().length > 0 && rating >= 1;

  return (
    <div className="mt-8 border-t border-muted/15 pt-6">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-xs text-muted">{labels.yourRating}</span>
        <InteractiveStarRating value={rating} onChange={onRatingChange} />
      </div>

      <Textarea
        value={comment}
        onChange={(e) => onCommentChange(e.target.value)}
        placeholder={labels.placeholder}
        aria-label={labels.placeholder}
        className="mt-4 min-h-[5.5rem]"
      />

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {submitted ? (
          <p className="text-sm text-foreground" role="status">
            {labels.success}
          </p>
        ) : (
          <span className="hidden sm:block" />
        )}
        <Button
          variant="primary"
          isDisabled={!canSubmit}
          onPress={onSubmit}
          className="h-11 w-full rounded-lg !bg-foreground !text-background font-semibold hover:!bg-foreground/90 sm:w-auto sm:min-w-[9.5rem]"
        >
          {labels.submit}
        </Button>
      </div>
    </div>
  );
}

function InteractiveStarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="group"
      aria-label="Rate this product"
    >
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        const selected = value > 0 && starValue <= value;
        return (
          <Button
            key={starValue}
            isIconOnly
            variant="ghost"
            aria-label={`${starValue} stars`}
            aria-pressed={selected}
            onPress={() => onChange(starValue)}
            className="min-h-8 min-w-8 p-0"
          >
            <Icon
              icon="lucide:star"
              width={18}
              height={18}
              className={cn(
                selected
                  ? cn(STAR_COLOR, '[&_path]:fill-current')
                  : 'text-muted/30',
              )}
              aria-hidden
            />
          </Button>
        );
      })}
    </div>
  );
}

function RatingSummary({
  average,
  ofReviewsLabel,
}: {
  average: number;
  ofReviewsLabel: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-3xl font-bold tabular-nums text-foreground sm:text-4xl">
        {average.toFixed(1)}
      </p>
      <p className="text-sm text-muted">{ofReviewsLabel}</p>
      <StarRating value={average} size="md" className="mt-1" />
    </div>
  );
}

function RatingBreakdownList({
  items,
  maxCount,
}: {
  items: readonly RatingBreakdownItem[];
  maxCount: number;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="grid grid-cols-[auto_1fr_auto] items-center gap-3"
        >
          <span className="min-w-[5.5rem] text-xs text-muted sm:min-w-[6rem] sm:text-sm">
            {item.label}
          </span>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-amber-500/90"
              style={{ width: `${(item.count / maxCount) * 100}%` }}
              role="presentation"
            />
          </div>
          <span className="min-w-[2ch] text-end text-xs tabular-nums text-muted sm:text-sm">
            {item.count}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  return (
    <li className="rounded-xl bg-surface-secondary/60 px-4 py-4 sm:px-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <ReviewAvatar src={review.avatarUrl} name={review.author} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {review.author}
            </p>
            <StarRating value={review.rating} size="sm" className="mt-0.5" />
          </div>
        </div>
        <time className="shrink-0 text-xs text-muted">{review.date}</time>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{review.body}</p>
      {review.images && review.images.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">
          {review.images.map((src, index) => (
            <li
              key={`${review.id}-img-${index}`}
              className="relative size-14 overflow-hidden rounded-lg bg-surface sm:size-16"
            >
              <Image
                src={src}
                alt=""
                sizes="64px"
                fit="cover"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function ReviewAvatar({ src, name }: { src: string; name: string }) {
  return (
    <div
      className="relative size-9 shrink-0 overflow-hidden rounded-full bg-surface sm:size-10"
      aria-hidden
    >
      <Image
        src={src}
        alt={name}
        sizes="40px"
        fit="cover"
        className="object-cover"
      />
    </div>
  );
}

function StarRating({
  value,
  size = 'md',
  className,
}: {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const iconSize = size === 'lg' ? 20 : size === 'sm' ? 14 : 16;

  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const filled = value >= i + 1 - 0.25;
        return (
          <Icon
            key={i}
            icon="lucide:star"
            width={iconSize}
            height={iconSize}
            className={cn(
              filled
                ? cn(STAR_COLOR, '[&_path]:fill-current')
                : 'text-muted/30',
            )}
            aria-hidden
          />
        );
      })}
    </div>
  );
}
