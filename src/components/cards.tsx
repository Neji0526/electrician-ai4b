import { Link } from '@tanstack/react-router'
import { Icon } from './Icon'
import { Badge } from './ui'
import { Photo, BeforeAfter } from './Photo'
import { RatingStars } from './RatingStars'
import { cx, formatMonth } from '~/lib/format'
import type { AreaCardData, ProjectCardData, Review, TeamMember } from '~/content/types'

/* ------------------------------------------------------------------ metrics */

export function MetricCard({
  value,
  label,
  detail,
  tone = 'light',
}: {
  value: string
  label: string
  detail?: string
  tone?: 'light' | 'dark'
}) {
  return (
    <div
      className={cx(
        'rounded-card border p-5',
        tone === 'dark' ? 'border-white/12 bg-white/[0.06]' : 'border-line bg-white shadow-card',
      )}
    >
      <p
        className={cx(
          'text-3xl font-extrabold tracking-tight md:text-4xl',
          tone === 'dark' ? 'text-white' : 'text-brand-700',
        )}
      >
        {value}
      </p>
      <p className={cx('mt-1.5 font-bold', tone === 'dark' ? 'text-brand-100' : 'text-ink')}>
        {label}
      </p>
      {detail ? (
        <p className={cx('mt-1 text-sm leading-snug', tone === 'dark' ? 'text-brand-200/80' : 'text-muted')}>
          {detail}
        </p>
      ) : null}
    </div>
  )
}

/* ----------------------------------------------------------------- projects */

export function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <li className="h-full">
      <Link
        to="/projects/$projectSlug"
        params={{ projectSlug: project.slug }}
        className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
      >
        <BeforeAfter before={project.before} after={project.after} />

        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1 font-semibold text-brand-700">
              <Icon name="map-pin" size={14} />
              {project.neighborhood}, {project.city}
            </span>
            <span aria-hidden="true">·</span>
            <span>{formatMonth(project.completedOn)}</span>
          </div>

          <h3 className="mt-2.5 text-[1.0625rem] font-bold leading-snug text-ink group-hover:text-brand-700">
            {project.title}
          </h3>

          <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{project.summary}</p>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <span className="text-sm font-semibold text-ink">{project.costRange}</span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
              View project
              <Icon
                name="arrow-right"
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}

/* ------------------------------------------------------------------ reviews */

export function ReviewCard({
  review,
  serviceName,
  className,
}: {
  review: Review
  serviceName?: string
  className?: string
}) {
  return (
    <figure
      className={cx(
        'flex h-full flex-col rounded-card border border-line bg-white p-5 shadow-card',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <RatingStars rating={review.rating} size={17} />
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">
          via {review.source}
        </span>
      </div>

      <blockquote className="mt-3.5 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
        “{review.text}”
      </blockquote>

      {review.response ? (
        <p className="mt-3.5 rounded-lg border-l-2 border-brand-300 bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-muted">
          <span className="font-semibold text-ink">Our reply: </span>
          {review.response}
        </p>
      ) : null}

      <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
          {review.name.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-bold text-ink">{review.name}</span>
          <span className="block truncate text-sm text-muted">
            {review.city}
            {serviceName ? ` · ${serviceName}` : ''}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

/* -------------------------------------------------------------------- areas */

export function AreaCard({ area }: { area: AreaCardData }) {
  return (
    <li className="h-full">
      <Link
        to="/service-areas/$locationSlug"
        params={{ locationSlug: area.slug }}
        className="group flex h-full flex-col rounded-card border border-line bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[1.0625rem] font-bold text-ink group-hover:text-brand-700">
              {area.city}, {area.state}
            </h3>
            <p className="mt-0.5 text-sm text-muted">{area.county}</p>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
            <Icon name="map-pin" size={18} />
          </span>
        </div>

        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{area.localNote}</p>

        <div className="mt-4 border-t border-line pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">ZIP codes served</p>
          <p className="mt-1.5 text-sm text-ink-soft">
            {area.zips.slice(0, 6).join(' · ')}
            {area.zips.length > 6 ? ` +${area.zips.length - 6} more` : ''}
          </p>
        </div>
      </Link>
    </li>
  )
}

/* --------------------------------------------------------------------- team */

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <li className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card">
      <Photo image={member.photo} aspect="1/1" rounded={false} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.0625rem] font-bold text-ink">{member.name}</h3>
        <p className="mt-0.5 text-sm font-semibold text-brand-700">{member.role}</p>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{member.bio}</p>

        {member.licenseInfo ? (
          <p className="mt-4 text-sm text-ink-soft">
            <span className="font-semibold">License:</span> {member.licenseInfo}
          </p>
        ) : null}

        {member.certifications.length ? (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {member.certifications.map((cert) => (
              <li key={cert}>
                <Badge tone="brand">{cert}</Badge>
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mt-4 border-t border-line pt-3.5 text-sm text-muted">
          <span className="font-semibold text-ink">{member.yearsExperience} years</span> in the trade
          · {member.specialties.join(', ')}
        </p>
      </div>
    </li>
  )
}
