import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Check, Upload, ArrowLeft, ArrowRight, Send, Share2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "You must be at least 18 years old"),
  country: z.string().min(2, "Country is required"),
  whyPickYou: z.string().min(20, "Please give us a bit more detail"),
  whatMakesYouDifferent: z.string().min(20, "Tell us more!"),
  craziestThing: z.string().min(10, "Don't be shy!"),
  videoUrl: z.string().url("Please provide a valid URL for your video"),
  socialMedia: z.string().min(2, "Social media handle is required"),
  agreement: z.boolean().refine((val) => val === true, "You must agree to the terms"),
});

type FormData = z.infer<typeof formSchema>;

interface ApplicationFormProps {
  onSuccess: (data: FormData) => void;
  onCancel: () => void;
}

export function ApplicationForm({ onSuccess, onCancel }: ApplicationFormProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      agreement: false,
      age: 18,
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (step === 1) fieldsToValidate = ["fullName", "email", "age", "country"];
    if (step === 2) fieldsToValidate = ["whyPickYou", "whatMakesYouDifferent", "craziestThing"];
    if (step === 3) fieldsToValidate = ["videoUrl", "socialMedia"];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setStep((s) => Math.min(s + 1, totalSteps));
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onSuccess(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          <span className="text-xs uppercase tracking-widest font-bold text-neon-blue">Step {step} of {totalSteps}</span>
          <span className="text-xs uppercase tracking-widest font-bold text-white/40">
            {step === 1 && "Personal Info"}
            {step === 2 && "The Interview"}
            {step === 3 && "Media & Social"}
            {step === 4 && "Final Agreement"}
          </span>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-neon-blue shadow-[0_0_10px_rgba(0,242,255,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-white/60">Full Name</label>
                <Input {...register("fullName")} placeholder="John Doe" />
                {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-white/60">Email Address</label>
                <Input {...register("email")} type="email" placeholder="john@example.com" />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-white/60">Age</label>
                  <Input {...register("age")} type="number" placeholder="21" />
                  {errors.age && <p className="text-xs text-red-500">{errors.age.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-white/60">Country</label>
                  <Input {...register("country")} placeholder="USA" />
                  {errors.country && <p className="text-xs text-red-500">{errors.country.message}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-white/60">Why should we pick you?</label>
                <Textarea {...register("whyPickYou")} placeholder="Tell us your story..." />
                {errors.whyPickYou && <p className="text-xs text-red-500">{errors.whyPickYou.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-white/60">What makes you different?</label>
                <Textarea {...register("whatMakesYouDifferent")} placeholder="What's your unique skill?" />
                {errors.whatMakesYouDifferent && <p className="text-xs text-red-500">{errors.whatMakesYouDifferent.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-white/60">Craziest thing you've done?</label>
                <Textarea {...register("craziestThing")} placeholder="Surprise us!" />
                {errors.craziestThing && <p className="text-xs text-red-500">{errors.craziestThing.message}</p>}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-white/60">Audition Video Link</label>
                <div className="relative">
                  <Input {...register("videoUrl")} placeholder="YouTube or Google Drive link" />
                  <Upload className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                </div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Max 60 seconds. Show us your energy!</p>
                {errors.videoUrl && <p className="text-xs text-red-500">{errors.videoUrl.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-white/60">Social Media Handle</label>
                <Input {...register("socialMedia")} placeholder="@yourusername" />
                {errors.socialMedia && <p className="text-xs text-red-500">{errors.socialMedia.message}</p>}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-display font-bold text-white">Final Agreement</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  By submitting this application, you agree to participate in the challenge if selected. 
                  You confirm that all information provided is true and that you are over 18 years of age.
                </p>
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      {...register("agreement")}
                      className="peer sr-only"
                    />
                    <div className="w-6 h-6 border-2 border-white/20 rounded bg-white/5 peer-checked:bg-neon-blue peer-checked:border-neon-blue transition-all" />
                    <Check className="absolute inset-0 w-4 h-4 m-auto text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    I agree to the terms and conditions
                  </span>
                </label>
                {errors.agreement && <p className="text-xs text-red-500">{errors.agreement.message}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between pt-8 border-t border-white/10">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}

          {step < totalSteps ? (
            <Button type="button" variant="primary" onClick={nextStep} className="gap-2">
              Next Step <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button type="submit" variant="neon" className="gap-2">
              Submit Application <Send className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export function SuccessPage({ onShare }: { onShare: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto text-center space-y-8 py-20"
    >
      <div className="w-24 h-24 bg-neon-blue rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,242,255,0.5)]">
        <Check className="w-12 h-12 text-black stroke-[3]" />
      </div>
      <div className="space-y-4">
        <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-white">
          You're In!
        </h2>
        <p className="text-xl text-white/60">
          Your application has been received. If selected, our casting team will contact you within 48 hours.
        </p>
      </div>
      <div className="pt-8 space-y-4">
        <p className="text-xs uppercase tracking-widest font-bold text-neon-blue">Boost your chances</p>
        <Button onClick={onShare} variant="outline" className="gap-2 w-full md:w-auto">
          <Share2 className="w-5 h-5" /> Share Your Application
        </Button>
      </div>
    </motion.div>
  );
}
