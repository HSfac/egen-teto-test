"use client";
import { useState } from "react";
import Modal from "./ui/Modal";

export default function AdBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isVisible) return null;

  const handleEmailInquiry = () => {
    window.open('mailto:homecreator.ai@gmail.com?subject=에겐/테토 테스트 광고 문의&body=안녕하세요. 에겐/테토 테스트 관련 광고 협력 및 제휴 문의드립니다.');
    setIsModalOpen(false);
  };

  return (
    <>
      {/* PC용 오른쪽 세로형 배너 */}
      <div className="hidden md:block fixed right-40 top-1/2 -translate-y-1/2 z-50">
        <div className="bg-gradient-to-b from-brand via-brand to-brand/80 text-white rounded-2xl p-8 shadow-2xl shadow-brand/50 w-[220px] backdrop-blur-md border-4 border-white/20">
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-base font-bold transition-all duration-200 hover:scale-110 shadow-md text-brand"
          >
            ×
          </button>
          
          <div className="flex flex-col items-center text-center space-y-6 pt-8">
            <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-5xl">💼</span>
            </div>
            
            <div className="space-y-2">
              <div className="text-xl font-bold leading-tight">광고<br/>문의</div>
              <div className="text-base opacity-90">Business<br/>Inquiry</div>
            </div>
            
            <div className="text-base leading-tight opacity-90 px-2">
              <strong>에겐/테토<br/>테스트</strong><br/>
              <span className="text-base">광고 협력<br/>제휴 문의</span>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => window.open('mailto:homecreator.ai@gmail.com?subject=에겐/테토 테스트 광고 문의&body=안녕하세요. 에겐/테토 테스트 관련 광고 협력 및 제휴 문의드립니다.')}
                className="w-full bg-white/90 hover:bg-white text-brand font-bold py-4 px-5 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg text-base"
              >
                📞<br/>문의하기
              </button>
              <div className="text-base opacity-80">
                빠른 답변<br/>보장 ⚡
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일용 우측하단 배너 */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <div 
          className="bg-gradient-to-br from-brand/95 to-brand text-black rounded-full p-3 shadow-brand backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs font-bold z-10"
          >
            ×
          </button>
          <div className="flex items-center gap-2">
            <span className="text-lg">💼</span>
            <div className="text-xs font-bold whitespace-nowrap">광고 문의</div>
          </div>
        </div>
      </div>

      {/* 모바일 광고문의 모달 */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="광고 문의"
      >
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-brand/20 rounded-xl flex items-center justify-center">
              <span className="text-4xl">💼</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">에겐/테토 테스트</h3>
            <p className="text-muted">광고 협력 및 제휴 문의</p>
          </div>
          
          <div className="text-sm text-muted leading-relaxed">
            <p>브랜드 협력, 광고 제휴, 마케팅 협업 등</p>
            <p>다양한 제안을 기다리고 있습니다.</p>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={handleEmailInquiry}
              className="w-full bg-brand hover:bg-brand/90 text-black font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span className="text-lg">📧</span>
              문의하기
            </button>
            <p className="text-xs text-muted">빠른 답변 보장 ⚡</p>
          </div>
        </div>
      </Modal>
    </>
  );
}