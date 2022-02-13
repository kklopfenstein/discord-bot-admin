class BotService
  def self.start(id)
    bot = Bot.find_by(id: id)
    return { message: "Not found.", success: false } unless bot
    return { message: "Already started.", success: false } if _bots[bot.token] && _started?(bot)

    _bots[bot.token] ||= Discordrb::Bot.new(token: bot.token)
    _setup!(_bots[bot.token], bot)

    { success: true }
  end

  def self.started?(id)
    bot = Bot.find_by(id: id)
    return false unless bot && _bots[bot.token]

    _started?(bot)
  end

  def self.stop(id)
    bot = Bot.find_by(id: id)
    return { message: "Not found.", success: false } unless bot
    return { message: "Already stopped.", success: false } unless _bots[bot.token]

    _bots[bot.token]&.stop
    _bots.delete(bot.token)
    { success: true }
  end

  private_class_method def self._bots
    @bots ||= {}
    @bots
  end

  private_class_method def self._started?(bot)
    _bots[bot.token].connected?
  end

  private_class_method def self._setup!(discord_bot, bot)
    bot.bot_responses.each do |bot_response|
      discord_bot.message(containing: bot_response.pattern, channel: bot_response.channel) do |event|
        event.respond bot_response.response
      end
    end

    discord_bot.run(true)
  end
end
