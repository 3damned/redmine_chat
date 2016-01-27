module Chat
  module ApplicationHelperPatch
    require 'net/https'
    require 'digest/md5'

    def self.included(base) # :nodoc:
      base.module_eval do
        unloadable


        def chat_url
          uri_params = {host: Setting['host_name'], path: '/redmine-chat/chat'}
          if Setting['protocol'] == 'https'
            URI::HTTPS.build(uri_params).to_s
          else
            URI::HTTP.build(uri_params).to_s
          end
        end

        def chat_message_token(issue_id, message_id)
          Base64.encode64 "#{FAYE_TOKEN}-#{issue_id}-#{message_id}"
        end

        def chat_broadcast(channel, issue_id, message_id, &block)
          message = {channel: channel,
                     data: capture(&block),
                     ext: {auth_token: chat_message_token(issue_id, message_id).chomp, issue_id: issue_id, message_id: message_id}}

          uri = URI.parse chat_url
          Net::HTTP.post_form(uri, message: message.to_json)
        end

        def gravatar_image_tag(email, size = 55)
          email = 'anonymous@example.com' unless email.present?
          hash = Digest::MD5.hexdigest(email)

          image_tag "http://www.gravatar.com/avatar/#{hash}?s=#{size}&d=identicon"
        end
      end
    end

  end
end
ApplicationHelper.send(:include, Chat::ApplicationHelperPatch)
