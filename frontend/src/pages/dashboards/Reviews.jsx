import { Star, MessageSquare } from 'lucide-react';

export default function Reviews() {
  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">Reviews</h1>
          <p className="text-slate-500 text-sm">Reviews you've left for guides and reviews guides have left for you.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary px-4 py-2 text-xs sm:text-sm">By You</button>
          <button className="btn btn-outline px-4 py-2 text-xs sm:text-sm bg-white text-slate-700">About You</button>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Review Item */}
        <div className="card p-4 sm:p-6 border border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/men/96.jpg" alt="Karthik" className="w-12 h-12 rounded-full object-cover shrink-0" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Review for Karthik Natarajan</h3>
                <div className="text-xs text-slate-500">Tour: Hidden Kitchens of Mylapore • Sept 14, 2023</div>
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="#F59E0B" color="#F59E0B" />)}
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
            "Karthik was simply incredible! He took us to places we would have never found on our own. The food was spectacular, but Karthik's deep knowledge of Chennai history and his storytelling ability made it an unforgettable night."
          </p>

          <div className="flex flex-wrap justify-between items-center gap-3">
            <span className="badge badge-success text-[10px]">PUBLISHED</span>
            <div className="flex gap-2">
              <button className="btn btn-outline px-3 py-1.5 text-xs text-slate-700 border-slate-200">Edit</button>
              <button className="btn btn-outline px-3 py-1.5 text-xs text-rose-600 border-rose-200 bg-rose-50">Delete</button>
            </div>
          </div>
        </div>

        {/* To Review Item */}
        <div className="card p-4 sm:p-6 border-2 border-teal-600">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <div className="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/men/43.jpg" alt="Arun" className="w-12 h-12 rounded-full object-cover shrink-0" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Arun P. is waiting for your review</h3>
                <div className="text-xs text-slate-500">Tour: Nilgiris Peak Trek Morning • Aug 02, 2023</div>
              </div>
            </div>
            <span className="badge bg-amber-100 text-amber-800 text-[10px]">PENDING</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button className="btn btn-primary px-5 py-2 text-xs sm:text-sm flex items-center gap-2">
              <MessageSquare size={16}/> Write Review
            </button>
            <span className="text-xs text-slate-500">You have 4 days left to leave a review.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
