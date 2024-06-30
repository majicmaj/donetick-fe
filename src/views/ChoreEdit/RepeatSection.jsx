import {
  Box,
  Card,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  List,
  ListItem,
  Option,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/joy'
import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { isPlusAccount } from '../../utils/Helpers'
import ThingTriggerSection from './ThingTriggerSection'

const FREQUANCY_TYPES_RADIOS = [
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'adaptive',
  'custom',
]

const FREQUENCY_TYPE_MESSAGE = {
  adaptive:
    'This chore will be scheduled dynamically based on previous completion dates.',
  custom: 'This chore will be scheduled based on a custom frequency.',
}
const REPEAT_ON_TYPE = ['interval', 'days_of_the_week', 'day_of_the_month']
const FREQUANCY_TYPES = [
  'once',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'adaptive',
  ...REPEAT_ON_TYPE,
]
const MONTH_WITH_NO_31_DAYS = [
  // TODO: Handle these months if day is 31
  'february',
  'april',
  'june',
  'september',
  'november',
]
const RepeatOnSections = ({
  frequencyType,
  frequency,
  onFrequencyUpdate,
  onFrequencyTypeUpdate,
  frequencyMetadata,
  onFrequencyMetadataUpdate,
  things,
}) => {
  const [months, setMonths] = useState({})
  // const [dayOftheMonth, setDayOftheMonth] = useState(1)
  const [daysOfTheWeek, setDaysOfTheWeek] = useState({})
  const [monthsOfTheYear, setMonthsOfTheYear] = useState({})
  const [intervalUnit, setIntervalUnit] = useState('days')

  switch (frequencyType) {
    case 'interval':
      return (
        <Grid item sm={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography level='h5'>Every: </Typography>
          <Input
            type='number'
            value={frequency}
            onChange={e => {
              if (e.target.value < 1) {
                e.target.value = 1
              }
              onFrequencyUpdate(e.target.value)
            }}
          />
          <Select placeholder='Unit' value={intervalUnit}>
            {['hours', 'days', 'weeks', 'months', 'years'].map(item => (
              <Option
                key={item}
                value={item}
                onClick={() => {
                  setIntervalUnit(item)
                  onFrequencyMetadataUpdate({
                    unit: item,
                  })
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Option>
            ))}
          </Select>
        </Grid>
      )
    case 'days_of_the_week':
      return (
        <Grid item sm={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Card>
            <List
              orientation='horizontal'
              wrap
              sx={{
                '--List-gap': '8px',
                '--ListItem-radius': '20px',
              }}
            >
              {[
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
                'sunday',
              ].map(item => (
                <ListItem key={item}>
                  <Checkbox
                    // disabled={index === 0}

                    checked={frequencyMetadata?.days?.includes(item) || false}
                    onClick={() => {
                      const newDaysOfTheWeek = frequencyMetadata['days'] || []
                      if (newDaysOfTheWeek.includes(item)) {
                        newDaysOfTheWeek.splice(
                          newDaysOfTheWeek.indexOf(item),
                          1,
                        )
                      } else {
                        newDaysOfTheWeek.push(item)
                      }

                      onFrequencyMetadataUpdate({
                        days: newDaysOfTheWeek.sort(),
                      })
                    }}
                    overlay
                    disableIcon
                    variant='soft'
                    label={item.charAt(0).toUpperCase() + item.slice(1)}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      )
    case 'day_of_the_month':
      return (
        <Grid
          item
          sm={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1.5,
            }}
          >
            <Typography>on the </Typography>
            <Input
              sx={{ width: '80px' }}
              type='number'
              value={frequency}
              onChange={e => {
                if (e.target.value < 1) {
                  e.target.value = 1
                } else if (e.target.value > 31) {
                  e.target.value = 31
                }
                // setDayOftheMonth(e.target.value)

                onFrequencyUpdate(e.target.value)
              }}
            />
            <Typography>of the following month/s: </Typography>
          </Box>
          <Card>
            <List
              orientation='horizontal'
              wrap
              sx={{
                '--List-gap': '8px',
                '--ListItem-radius': '20px',
              }}
            >
              {[
                'january',
                'february',
                'march',
                'april',
                'may',
                'june',
                'july',
                'august',
                'september',
                'october',
                'november',
                'december',
              ].map(item => (
                <ListItem key={item}>
                  <Checkbox
                    // disabled={index === 0}
                    checked={frequencyMetadata?.months?.includes(item)}
                    // checked={months[item] || false}
                    // onClick={() => {
                    //   const newMonthsOfTheYear = {
                    //     ...monthsOfTheYear,
                    //   }
                    //   newMonthsOfTheYear[item] = !newMonthsOfTheYear[item]
                    //   onFrequencyMetadataUpdate({
                    //     months: newMonthsOfTheYear,
                    //   })
                    //   setMonthsOfTheYear(newMonthsOfTheYear)
                    // }}
                    onClick={() => {
                      const newMonthsOfTheYear =
                        frequencyMetadata['months'] || []
                      if (newMonthsOfTheYear.includes(item)) {
                        newMonthsOfTheYear.splice(
                          newMonthsOfTheYear.indexOf(item),
                          1,
                        )
                      } else {
                        newMonthsOfTheYear.push(item)
                      }

                      onFrequencyMetadataUpdate({
                        months: newMonthsOfTheYear.sort(),
                      })
                      console.log('newMonthsOfTheYear', newMonthsOfTheYear)
                      // setDaysOfTheWeek(newDaysOfTheWeek)
                    }}
                    overlay
                    disableIcon
                    variant='soft'
                    label={item.charAt(0).toUpperCase() + item.slice(1)}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      )

    default:
      return <></>
  }
}

const RepeatSection = ({
  frequencyType,
  frequency,
  onFrequencyUpdate,
  onFrequencyTypeUpdate,
  frequencyMetadata,
  onFrequencyMetadataUpdate,
  frequencyError,
  allUserThings,
  onTriggerUpdate,
  OnTriggerValidate,
  isAttemptToSave,
  selectedThing,
}) => {
  const [repeatOn, setRepeatOn] = useState('interval')
  const { userProfile, setUserProfile } = useContext(UserContext)
  return (
    <Box mt={2}>
      <Typography level='h4'>Repeat :</Typography>
      <FormControl sx={{ mt: 1 }}>
        <Checkbox
          onChange={e => {
            onFrequencyTypeUpdate(e.target.checked ? 'daily' : 'once')
            if (e.target.checked) {
              onTriggerUpdate(null)
            }
          }}
          defaultChecked={!['once', 'trigger'].includes(frequencyType)}
          checked={!['once', 'trigger'].includes(frequencyType)}
          value={!['once', 'trigger'].includes(frequencyType)}
          overlay
          label='Repeat this task'
        />
        <FormHelperText>
          Is this something needed to be done regularly?
        </FormHelperText>
      </FormControl>
      {!['once', 'trigger'].includes(frequencyType) && (
        <>
          <Card sx={{ mt: 1 }}>
            <Typography level='h5'>How often should it be repeated?</Typography>

            <List
              orientation='horizontal'
              wrap
              sx={{
                '--List-gap': '8px',
                '--ListItem-radius': '20px',
              }}
            >
              {FREQUANCY_TYPES_RADIOS.map((item, index) => (
                <ListItem key={item}>
                  <Checkbox
                    // disabled={index === 0}
                    checked={
                      item === frequencyType ||
                      (item === 'custom' &&
                        REPEAT_ON_TYPE.includes(frequencyType))
                    }
                    // defaultChecked={item === frequencyType}
                    onClick={() => {
                      if (item === 'custom') {
                        onFrequencyTypeUpdate(REPEAT_ON_TYPE[0])
                        onFrequencyUpdate(1)
                        onFrequencyMetadataUpdate({
                          unit: 'days',
                        })
                        return
                      }
                      onFrequencyTypeUpdate(item)
                    }}
                    overlay
                    disableIcon
                    variant='soft'
                    label={
                      item.charAt(0).toUpperCase() +
                      item.slice(1).replace('_', ' ')
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Typography>{FREQUENCY_TYPE_MESSAGE[frequencyType]}</Typography>
            {frequencyType === 'custom' ||
              (REPEAT_ON_TYPE.includes(frequencyType) && (
                <>
                  <Grid container spacing={1} mt={2}>
                    <Grid item>
                      <Typography>Repeat on:</Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                        <RadioGroup
                          orientation='horizontal'
                          aria-labelledby='segmented-controls-example'
                          name='justify'
                          // value={justify}
                          // onChange={event => setJustify(event.target.value)}
                          sx={{
                            minHeight: 48,
                            padding: '4px',
                            borderRadius: '12px',
                            bgcolor: 'neutral.softBg',
                            '--RadioGroup-gap': '4px',
                            '--Radio-actionRadius': '8px',
                            mb: 1,
                          }}
                        >
                          {REPEAT_ON_TYPE.map(item => (
                            <Radio
                              key={item}
                              color='neutral'
                              checked={item === frequencyType}
                              onClick={() => {
                                if (
                                  item === 'day_of_the_month' ||
                                  item === 'interval'
                                ) {
                                  onFrequencyUpdate(1)
                                }
                                onFrequencyTypeUpdate(item)
                                if (item === 'days_of_the_week') {
                                  onFrequencyMetadataUpdate({ days: [] })
                                } else if (item === 'day_of_the_month') {
                                  onFrequencyMetadataUpdate({ months: [] })
                                } else if (item === 'interval') {
                                  onFrequencyMetadataUpdate({ unit: 'days' })
                                }
                                // setRepeatOn(item)
                              }}
                              value={item}
                              disableIcon
                              label={item
                                .split('_')
                                .map((i, idx) => {
                                  // first or last word
                                  if (
                                    idx === 0 ||
                                    idx === item.split('_').length - 1
                                  ) {
                                    return (
                                      i.charAt(0).toUpperCase() + i.slice(1)
                                    )
                                  }
                                  return i
                                })
                                .join(' ')}
                              variant='plain'
                              sx={{
                                px: 2,
                                alignItems: 'center',
                              }}
                              slotProps={{
                                action: ({ checked }) => ({
                                  sx: {
                                    ...(checked && {
                                      bgcolor: 'background.surface',
                                      boxShadow: 'sm',
                                      '&:hover': {
                                        bgcolor: 'background.surface',
                                      },
                                    }),
                                  },
                                }),
                              }}
                            />
                          ))}
                        </RadioGroup>
                      </Box>
                    </Grid>

                    <RepeatOnSections
                      frequency={frequency}
                      onFrequencyUpdate={onFrequencyUpdate}
                      frequencyType={frequencyType}
                      onFrequencyTypeUpdate={onFrequencyTypeUpdate}
                      frequencyMetadata={frequencyMetadata || {}}
                      onFrequencyMetadataUpdate={onFrequencyMetadataUpdate}
                      things={allUserThings}
                    />
                  </Grid>
                </>
              ))}
            <FormControl error={Boolean(frequencyError)}>
              <FormHelperText error>{frequencyError}</FormHelperText>
            </FormControl>
          </Card>
        </>
      )}
      <FormControl sx={{ mt: 1 }}>
        <Checkbox
          onChange={e => {
            onFrequencyTypeUpdate(e.target.checked ? 'trigger' : 'once')
            //  if unchecked, set selectedThing to null:
            if (!e.target.checked) {
              onTriggerUpdate(null)
            }
          }}
          defaultChecked={frequencyType === 'trigger'}
          checked={frequencyType === 'trigger'}
          value={frequencyType === 'trigger'}
          disabled={!isPlusAccount(userProfile)}
          overlay
          label='Trigger this task based on a thing state'
        />
        <FormHelperText
          sx={{
            opacity: !isPlusAccount(userProfile) ? 0.5 : 1,
          }}
        >
          Is this something that should be done when a thing state changes?{' '}
          {!isPlusAccount(userProfile) && (
            <Chip variant='soft' color='warning'>
              Not available in Basic Plan
            </Chip>
          )}
        </FormHelperText>
      </FormControl>
      {frequencyType === 'trigger' && (
        <ThingTriggerSection
          things={allUserThings}
          onTriggerUpdate={onTriggerUpdate}
          onValidate={OnTriggerValidate}
          isAttemptToSave={isAttemptToSave}
          selected={selectedThing}
        />
      )}
    </Box>
  )
}

export default RepeatSection
