"use client"

import { resetPasswordWithToken } from "@lib/data/customer"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useSearchParams } from "next/navigation"
import { useActionState } from "react"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""
  const [message, formAction] = useActionState(resetPasswordWithToken, null)

  return (
    <div className="w-full flex justify-center px-8 py-12">
      <div className="max-w-sm w-full flex flex-col items-center">
        <h1 className="text-large-semi uppercase mb-6">Create New Password</h1>
        <p className="text-center text-base-regular text-ui-fg-base mb-8">
          Enter a new password for your Radeon account.
        </p>

        {message?.state === "success" ? (
          <div className="w-full text-center flex flex-col items-center">
            <div className="w-full mb-6 text-center text-base-regular text-green-700 bg-green-50 border border-green-200 rounded-rounded p-4">
              {message.message}
            </div>
            <LocalizedClientLink
              href="/account"
              className="px-6 py-3 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign In to Your Account
            </LocalizedClientLink>
          </div>
        ) : (
          <form className="w-full" action={formAction}>
            <input type="hidden" name="token" value={token} />
            <div className="flex flex-col w-full gap-y-4">
              {!token && (
                <Input
                  label="Reset Token"
                  name="token"
                  type="text"
                  required
                  placeholder="Paste your reset token here"
                />
              )}
              <Input
                label="New Password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                data-testid="new-password-input"
              />
            </div>
            <ErrorMessage
              error={message?.state === "error" ? message.error : null}
              data-testid="reset-password-error-message"
            />
            <SubmitButton data-testid="submit-new-password-button" className="w-full mt-6">
              Reset Password
            </SubmitButton>
          </form>
        )}
      </div>
    </div>
  )
}
