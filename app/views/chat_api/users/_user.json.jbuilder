json.id user.id.to_s
json.name user.name
json.settings do
  gravatar_param = user.email.present? ? user.email : user.name
  json.photo_url gravatar_url(gravatar_param.to_s, default: 'identicon')
end
