import React from 'react';
import { useParams } from 'react-router-dom';
import { useGuide } from '../features/guide/hooks/useGuide';
import { useReviews } from '../features/guide/hooks/useReviews';
import GuideHero from '../features/guide/components/GuideHero';
import GuideGallery from '../features/guide/components/GuideGallery';
import GuideAbout from '../features/guide/components/GuideAbout';
import GuideStats from '../features/guide/components/GuideStats';
import GuideLanguages from '../features/guide/components/GuideLanguages';
import GuideCertificates from '../features/guide/components/GuideCertificates';
import GuideTimeline from '../features/guide/components/GuideTimeline';
import GuideReviews from '../features/guide/components/GuideReviews';
import GuideFAQ from '../features/guide/components/GuideFAQ';
import BookingCard from '../features/guide/components/BookingCard';
import SimilarGuides from '../features/guide/components/SimilarGuides';
import GuideSkeleton from '../features/guide/components/GuideSkeleton';
import EmptyGuide from '../features/guide/components/EmptyGuide';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';

export default function Profile() {
  const { id } = useParams();

  // Load guide data & booking state
  const {
    guide,
    similarGuides,
    loading: guideLoading,
    error,
    selectedDate,
    setSelectedDate,
    guestsCount,
    setGuestsCount
  } = useGuide(id);

  // Load traveler reviews & metrics
  const {
    reviews,
    paginatedReviews,
    loading: reviewsLoading,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    totalReviews,
    averageRating,
    ratingBreakdown
  } = useReviews(id, 3); // Displays 3 reviews per page

  // Display skeletons during fetch
  if (guideLoading) {
    return <GuideSkeleton />;
  }

  // Display error screen if lookup failure occurs
  if (error || !guide) {
    return <EmptyGuide error={error} />;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <SEO title={`${guide.name} - Private Local Tour Guide in ${guide.city}`} />

      {/* Guide cover header & title banner */}
      <GuideHero guide={guide} />

      <div className="container mx-auto px-4 max-w-7xl pt-4">
        {/* Breadcrumbs navigation trace */}
        <Breadcrumbs crumbs={[{ label: 'Guides', path: '/search' }, { label: guide.name, path: '#' }]} />

        {/* Workspace responsive ordering grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content Sections Column (Takes 2 grid columns on wide views) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Mobile Ticket Booking Card (Directly below summary/breadcrumbs above the fold) */}
            <div className="lg:hidden">
              <BookingCard
                guide={guide}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                guestsCount={guestsCount}
                onGuestsChange={setGuestsCount}
              />
            </div>

            <GuideGallery guide={guide} />
            
            <GuideAbout guide={guide} />
            
            <GuideStats guide={guide} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GuideLanguages languages={guide.languages} />
              <GuideCertificates certifications={guide.certifications} />
            </div>

            <GuideTimeline experience={guide.experience} />
            
            <GuideReviews
              reviews={reviews}
              paginatedReviews={paginatedReviews}
              loading={reviewsLoading}
              sortBy={sortBy}
              setSortBy={setSortBy}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              totalReviews={totalReviews}
              averageRating={averageRating}
              ratingBreakdown={ratingBreakdown}
            />

            <GuideFAQ />
            
            {/* Alternative state recommendations */}
            <SimilarGuides guides={similarGuides} />

          </div>

          {/* Desktop Sticky Booking Sidebar Column (Takes 1 grid column on wide views) */}
          <div className="hidden lg:block lg:col-span-1">
            <BookingCard
              guide={guide}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              guestsCount={guestsCount}
              onGuestsChange={setGuestsCount}
            />
          </div>

        </div>
      </div>
    </div>
  );
}


